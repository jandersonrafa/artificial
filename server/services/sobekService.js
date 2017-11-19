var rp = require('request-promise');

module.exports = {
	// Para obter os termos extraídos pelo Sobek, basta fazer uma requisição para o web service dele, passando o texto como entrada e qualquer outro parâmetro desejado. 
	// O endereço dele é: http://sobek.ufrgs.br/webservice/sobek.php
	// O php recebe um POST e o nome do parâmetro que recebe os valores é 'entrada' (ou 'Data'). Então quando fores enviar textos ou Strings para o serviço, lembre de usar POST e do nome da variável. Essa versão permite os seguintes parâmetros na chamada:
	// -c -> define o Número médio de termos;
	// -m -> define a frequência mínima para um termo ser relacionado
	// -o -> define o número mínimo de ocorrências para um termo ser relacionado
	// -w -> adiciona um arquivo com stop words (para mais detalhes, enviar e-mail)
	// -l -> seleciona o idioma: 1 para portugues, 2 para ingles
	// -tree -> Remove todos os elementos de uma classe gramatical. São as possibilidades:
	// ·  removeTodosTagsPt;
	// ·  tagVebos;
	// ·  tagSubs;
	// ·  tagAdje;
	// ·  tagAdverbio;
	// ·  tagDeterminante;
	// ·  tagCardinal;
	// ·  tagPronome;
	// ·  tagPreposicao;
	// ·  tagInterjeicao;
	// ·  tagVirg;
	// ·  tagSent;
	// ·  tagPrepDet;
	// ·  tagVP;  
	// Opções de saída:
	// -b -> saída apenas com os termos, sem relações ou informações.
	// -x -> saída no formato de XML, com todas as informações extraídas
	// -n -> saída no modelo "Termo;frequência"
	// O último parâmetro (que deve sempre ser adicionado) é -t. 
	// Exemplos:
	// Saída em XML, língua portuguesa, mineração realizada a partir do arquivo arquivo.txt.
	// " -l 1 -f arquivo.txt -t "
	// Saída apenas com conceitos, mineração realizada a partir de um texto
	// "-b  -t texto texto texto texto..."
	send: function (text) {
		var parametersSobek = "-b  -t "
		var options = {
			form: { data: parametersSobek + text },
			json: true // Automatically stringifies the body to JSON
		};
		return rp.post('http://sobek.ufrgs.br/webservice/sobek.php', options)
	}
};