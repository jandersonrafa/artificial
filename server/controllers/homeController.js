var VendaCentral = require('./../models/VendaCentral');

module.exports = function (app) {
	const BASE_URL = '/home';

	app.post(BASE_URL + '/api/find-equipamentos-indicados', function (req, res) {
		var vendaNova = req.body;
		var listSugestao = [];
		vendaNova.vlPesoTotal = calculaTotalPesoPerguntas();

		// use mongoose to get all vendaCentral in the database
		VendaCentral.find(function (err, listVendaCentral) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err);
			} else {
				listVendaCentral.forEach(function (vendaExistente) {
					vendaExistente.vlPesoTotal = comparaECalculaTotalPeso(vendaNova, vendaExistente);
					listSugestao.push({
						tpMarca: vendaExistente.equipamentoIndicado.tpMarca
						, dsEquipamento: vendaExistente.equipamentoIndicado.dsEquipamento
						, pcSimilaridade: (((vendaExistente.vlPesoTotal / vendaNova.vlPesoTotal) * 100).toFixed(2))
					})
				}, this);

				listSugestao.sort(function (a, b) { return b.pcSimilaridade - a.pcSimilaridade });
				var listSugestaoDistinct = [];
				listSugestao.forEach(function(vd) {
					if (!listSugestaoDistinct.some(elem => elem.tpMarca ===  vd.tpMarca && elem.dsEquipamento ===  vd.dsEquipamento) && listSugestaoDistinct.length <5 ) {
						listSugestaoDistinct.push(vd);
					}
				});
				res.json(listSugestaoDistinct); // return all vendaCentral in JSON format
			}
		});
	});

	compareBoolean = function (vendaNova, vendaExistente, atributo) {
		return vendaNova[atributo] === vendaExistente[atributo] ? 1 : 0;
	}

	const valorDominioQtdFuncionario = {
		Q12: {
			Q12: 1, Q32: 0.8, Q64: 0, Q128: 0, Q128M: 0,
		},
		Q32: {
			Q12: 0, Q32: 1, Q64: 0.8, Q128: 0, Q128M: 0,
		},
		Q64: {
			Q12: 0, Q32: 0, Q64: 1, Q128: 0.8, Q128M: 0,
		},
		Q128: {
			Q12: 0, Q32: 0, Q64: 0, Q128: 1, Q128M: 0.8,
		},
		Q128M: {
			Q12: 0, Q32: 0, Q64: 0, Q128: 0, Q128M: 1,
		},
	}

	const valorDominioQtdToquesSimultaneos = {
		Q6: {
			Q6: 1, Q10: 0.8, Q30: 0, Q30M: 0,
		},
		Q10: {
			Q6: 0, Q10: 1, Q30: 0.8, Q30M: 0,
		},
		Q30: {
			Q6: 0, Q10: 0, Q30: 1, Q30M: 0.8,
		},
		Q30M: {
			Q6: 0, Q10: 0, Q30: 0, Q30M: 1,
		},
	}

	const valorDominioQtdLigacoesConcorrentes = {
		Q4: {
			Q4: 1, Q8: 0.8, Q12: 0, Q16: 0, Q16M: 0,
		},
		Q8: {
			Q4: 0, Q8: 1, Q12: 0.8, Q16: 0, Q16M: 0,
		},
		Q12: {
			Q4: 0, Q8: 0, Q12: 1, Q16: 0.8, Q16M: 0,
		},
		Q16: {
			Q4: 0, Q8: 0, Q12: 0, Q16: 1, Q16M: 0.8,
		},
		Q16M: {
			Q4: 0, Q8: 0, Q12: 0, Q16: 0, Q16M: 1,
		},
	}

	const NIVEL_BAIXO = 1;
	const NIVEL_MEDIO = 2;
	const NIVEL_ALTO = 4;
	const NIVEL_MUITO_ALTO = 8;

	calculaNivelBaixo = function (valor) {
		return NIVEL_BAIXO * valor;
	}
	calculaNivelMedio = function (valor) {
		return NIVEL_MEDIO * valor;
	}
	calculaNivelAlto = function (valor) {
		return NIVEL_ALTO * valor;
	}
	calculaNivelMuitoAlto = function (valor) {
		return NIVEL_MUITO_ALTO * valor;
	}

	calculoPesoTp = function (vendaNova, vendaExistente, atributo, valorDominioQtdFuncionario) {
		return valorDominioQtdFuncionario[vendaNova[atributo]][vendaExistente[atributo]];
	}

	comparaECalculaTotalPeso = function (vendaNova, vendaExistente) {
		const VALOR_ABSOLUTO = 1;
		var pesoTotal = 0;
		pesoTotal += calculaNivelAlto(compareBoolean(vendaNova, vendaExistente, 'blDdr'));
		pesoTotal += calculaNivelMuitoAlto(compareBoolean(vendaNova, vendaExistente, 'blPriorizaSolucao'));
		pesoTotal += calculaNivelMedio(compareBoolean(vendaNova, vendaExistente, 'blComputadorAtendente'));
		pesoTotal += calculaNivelBaixo(compareBoolean(vendaNova, vendaExistente, 'blSecretariaEletronica'));
		pesoTotal += calculaNivelBaixo(compareBoolean(vendaNova, vendaExistente, 'blFuncaoRonda'));
		pesoTotal += calculaNivelAlto(compareBoolean(vendaNova, vendaExistente, 'blFluxoAltoFiliais'));
		pesoTotal += calculaNivelAlto(compareBoolean(vendaNova, vendaExistente, 'blFuncionarioRamalCelular'));

		pesoTotal += calculaNivelMedio(calculoPesoTp(vendaNova, vendaExistente, 'tpQtdFuncionarios', valorDominioQtdFuncionario));
		pesoTotal += calculaNivelMedio(calculoPesoTp(vendaNova, vendaExistente, 'tpQtdLigacoesConcorrentes', valorDominioQtdLigacoesConcorrentes));
		pesoTotal += calculaNivelMedio(calculoPesoTp(vendaNova, vendaExistente, 'tpQtdToquesSimultaneos', valorDominioQtdToquesSimultaneos));
		var isMarcaIgual = vendaNova.tpMarcaPreferencia === vendaExistente.equipamentoIndicado.tpMarca;
		var isMarcaQualquer = vendaNova.tpMarcaPreferencia === "Qualquer";
		pesoTotal += calculaNivelAlto(isMarcaIgual || isMarcaQualquer ? 1 : 0);

		return pesoTotal;
	}


	calculaTotalPesoPerguntas = function () {
		const VALOR_ABSOLUTO = 1;
		var pesoTotal = 0;

		var pesoBlDdr = calculaNivelAlto(VALOR_ABSOLUTO);
		var pesoBlPriorizaSolucao = calculaNivelMuitoAlto(VALOR_ABSOLUTO);
		var pesoBlComputadorAtendente = calculaNivelMedio(VALOR_ABSOLUTO);
		var pesoBlSecretariaEletronica = calculaNivelBaixo(VALOR_ABSOLUTO);
		var pesoBlFuncaoRonda = calculaNivelBaixo(VALOR_ABSOLUTO);
		var pesoBlFluxoAltoFiliais = calculaNivelAlto(VALOR_ABSOLUTO);
		var pesoBlFuncionarioRamalCelular = calculaNivelAlto(VALOR_ABSOLUTO);

		var pesoTpMarcaPreferencia = calculaNivelAlto(VALOR_ABSOLUTO);
		var pesoTpQtdFuncionarios = calculaNivelMedio(VALOR_ABSOLUTO);
		var pesoTpQtdLigacoesConcorrentes = calculaNivelMedio(VALOR_ABSOLUTO);
		var pesoTpQtdToquesSimultaneos = calculaNivelMedio(VALOR_ABSOLUTO);

		pesoTotal += pesoBlDdr;
		pesoTotal += pesoBlPriorizaSolucao;
		pesoTotal += pesoBlComputadorAtendente;
		pesoTotal += pesoBlSecretariaEletronica;
		pesoTotal += pesoBlFuncaoRonda;
		pesoTotal += pesoBlFluxoAltoFiliais;
		pesoTotal += pesoBlFuncionarioRamalCelular;

		pesoTotal += pesoTpMarcaPreferencia;
		pesoTotal += pesoTpQtdFuncionarios;
		pesoTotal += pesoTpQtdLigacoesConcorrentes;
		pesoTotal += pesoTpQtdToquesSimultaneos;
		return pesoTotal;
	}

};