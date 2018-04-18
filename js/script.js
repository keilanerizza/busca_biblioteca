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
	$('#porcentagemProgresso').addClass('visivel');
	$('#btnPesquisar').val('Cancelar');
	$('#btnPesquisar').css('background-color', 'red');
	
	if ($('#brrProgresso').val() < 99) {
		iniciaCronometro();
	} else if($('#brrProgresso').val() === 100) {
		cancelaBusca()
	} else {
		resetaBarra()
	}
}

function iniciaCronometro() {
	$('#brrProgresso').val($('#brrProgresso').val() + 1);
	$('#porcentagemProgresso').text($('#brrProgresso').val() + 1 + '%');
	cronometroBusca = setTimeout("toggleProgressBar()", 500);
}

function cancelaBusca() {
	let confirmacaoDeCancelamento = confirm('Deseja parar a pesquisa ?')
	if (confirmacaoDeCancelamento) {
		resetaBarra();
	} else {
		$('#brrProgresso').val(brrProgressoSalvo);
	}
}

function resetaBarra() {
	clearTimeout(cronometroBusca);
	$('#brrProgresso').removeClass('visivel');
	$('#porcentagemProgresso').removeClass('visivel');
	alert('Nada encontrado.');
	$('#btnPesquisar').val('Pesquisar');
	$('#btnPesquisar').css('background-color', '#4CAF50');
	$('#brrProgresso').val('0');
	$('#porcentagemProgresso').text('0');
}

function mostrarAjuda() {
	alert('Ajuda do sistema de consulta da biblioteca. \n\nAutor(es): informe o nome de um ou mais autor ...')
}