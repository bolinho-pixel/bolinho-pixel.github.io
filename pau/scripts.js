$(document).ready(function() {
    let editMode = false;
    let aspectRatio = false;
    let codeMirrorEditor;
    let currentElement;
    let editType;

    $("#toggle-edit").click(function() {
        editMode = !editMode;
        if (editMode) {
            $(this).text("Modo Visualizar");
            $("#image-input").show();
            $(".image-item").draggable({ disabled: false }).resizable({
                disabled: false,
                aspectRatio: aspectRatio,
                alsoResize: "img"
            });
        } else {
            $(this).text("Modo Editar");
            $("#image-input").hide();
            $(".image-item").draggable({ disabled: true }).resizable({
                disabled: true
            });
            saveImagePositions();
        }
    });

    $("#toggle-aspect-ratio").click(function() {
        aspectRatio = !aspectRatio;
        $(this).text(`Manter Proporção: ${aspectRatio ? 'On' : 'Off'}`);
        if (editMode) {
            $(".image-item").resizable("option", "aspectRatio", aspectRatio);
        }
    });

    $("#image-input").change(function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $.ajax({
                    url: 'pau/upload_image.php',
                    type: 'POST',
                    data: {
                        imageData: e.target.result,
                        imageName: file.name
                    },
                    success: function(response) {
                        const img = $("<img>").attr("src", response);
                        const div = $("<div>").addClass("image-item").append(img).appendTo("#image-container");
                        div.draggable().resizable({
                            aspectRatio: aspectRatio,
                            alsoResize: img
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error("Erro ao fazer upload da imagem:", error);
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

    function saveImagePositions() {
        const imagePositions = [];
        $(".image-item").each(function() {
            const position = $(this).position();
            const size = {
                width: $(this).width(),
                height: $(this).height()
            };
            imagePositions.push({
                src: $(this).find("img").attr("src"),
                left: position.left,
                top: position.top,
                width: size.width,
                height: size.height
            });
        });

        $.ajax({
            url: 'pau/save_positions.php',
            type: 'POST',
            data: { positions: JSON.stringify(imagePositions) },
            success: function(response) {
                alert("Posições salvas com sucesso!");
            },
            error: function(xhr, status, error) {
                console.error("Erro ao salvar posições:", error);
            }
        });
    }

    function loadImagePositions() {
        $.ajax({
            url: 'pau/load_positions.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.length) {
                    data.forEach(function(image) {
                        const img = $("<img>").attr("src", image.src);
                        const div = $("<div>").addClass("image-item").css({
                            left: image.left + 'px',
                            top: image.top + 'px',
                            width: image.width + 'px',
                            height: image.height + 'px'
                        }).append(img).appendTo("#image-container");
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro ao carregar posições:", error);
            }
        });
    }

    $("#image-container").on("contextmenu", ".image-item", function(event) {
        if (editMode) {
            event.preventDefault(); // Previne o menu de contexto padrão do navegador
            const imageUrl = $(this).find("img").attr("src");
            $.ajax({
                url: 'pau/delete_image.php',
                type: 'POST',
                data: { imageUrl: imageUrl },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error("Erro ao deletar a imagem:", error);
                }
            });
            $(this).remove(); // Remove o elemento da imagem
        }
    });
    
    loadImagePositions();
});