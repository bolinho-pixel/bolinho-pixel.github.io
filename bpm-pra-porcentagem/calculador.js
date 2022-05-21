//Só matemática aqui. Se quiser roubar, roube :)

function cachedeerro() {
  return true;
}
window.onerror = cachedeerro;

function calcular(t1,t2){
	var val=Math.round(100*(t1/t2)*1000)/1000;
	if(isNaN(val)){document.calc2.result.value='Erro de sintaxe'}else{document.calc2.result.value=val};
}

function cru(t1,t2){
	var vv = Math.round(100*(t1/t2)*1000)/1000;
	if(isNaN(vv)) {return 'errorclick.wav'}else{return 'selectclick.wav'};
}