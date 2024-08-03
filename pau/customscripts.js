$('.image-item > *[src="pau/uploads/img_66adf2bf724f2.jpg"]').click(function(){
            
            var audio = new Audio('https://www.myinstants.com/media/sounds/nom-nom-nom_gPJiWn4.mp3');
audio.play();
var eu = $(this)
eu.find('img').hide()
$('<button style="margin: auto">quero mais poha</button>').click(function(){
  eu.find('img').show();
  $(this).remove();
}).appendTo(eu).fadeIn();
        });

$('.image-item > *[src="pau/uploads/img_66adeaac97e6b.gif"]').click(function(){
            var audio = new Audio('');
            audio.play();
});