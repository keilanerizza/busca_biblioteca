// var global
var brrProgressoSalvo;

function pesquisarRef() {
	if ($('#btnPesquisar').val() === 'Cancelar') {
		brrProgressoSalvo = $('#brrProgresso').val();
		$('#brrProgresso').val('100');
	}
	validaCampos();
}

function validaCampos() {
	let autor = $('#txtAutor').val().trim();
	let assunto = $('#txtAssunto').val().trim();
	let detailsOpen = $('details').attr('open');
	let isbn;
	if ($('details').attr('open')) {
		isbn = $('#txtISBN').val().trim();
	}
	$('#txtAutor, #txtAssunto, #txtISBN').css("border", "1px solid #c5c5c5");
	if (autor === '') {
		mostraErroValidacao($('#txtAutor'));
	} else if (assunto === '') {
		mostraErroValidacao($('#txtAssunto'))
	} else if (detailsOpen && isbn === '') {
		mostraErroValidacao($('#txtISBN'))
	} else {
		toggleProgressBar();
	}

}

function mostraErroValidacao(field) {
	alert('Por favor, preencha o campo ' + field[0].name + '.');
	$(field).css("border", "2px solid #ff000085");
	$(field).focus();
}

function toggleProgressBar() {
	$('#brrProgresso').addClass('visivel');
	$('#btnPesquisar').val('Cancelar');
	
	if ($('#brrProgresso').val() < 99) {
		iniciaCronometro();
	} else if($('#brrProgresso').val() === 100) {
		cancelaBusca()
	} else {
		mostrarResultado()
	}
}

function iniciaCronometro() {
	$('#brrProgresso').val($('#brrProgresso').val() + 1);
	cronometroBusca = setTimeout("toggleProgressBar()", 20);
}

function resetaBarra() {
	$('#brrProgresso').val('0');
}

function cancelaBusca() {
	let confirmacaoDeCancelamento = confirm('Deseja parar a pesquisa ?')
	if (confirmacaoDeCancelamento) {
		mostrarResultado();
	} else {
		$('#brrProgresso').val(brrProgressoSalvo);
	}
}

function mostrarResultado() {
	clearTimeout(cronometroBusca);
	$('#brrProgresso').removeClass('visivel');
	alert('Nada encontrado.');
	$('#btnPesquisar').val('Pesquisar');
	resetaBarra();
}