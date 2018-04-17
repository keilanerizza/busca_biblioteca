function pesquisarRef(){
	var autor = $("#txtAutor").val();

	if (autor.trim()==""){
		alert("erro autor");
	}

	else {
		var barraProgresso = $("#brrProgresso");
		barraProgresso.toggleClass("visivel");
		var btPesquisar = $("#btnPesquisar");
		btPesquisar.style
		btPesquisar.value="Cancelar";
		
		if(barraProgresso.value<100){
			barraProgresso.value++;
			setTimeout("pesquisarRef()",40);
		}
		else{
			alert("nada encontrado");
			btPesquisar.value="Pesquisar";
		}
	}
}

