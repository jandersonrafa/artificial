var mongoose = require('mongoose');

module.exports = mongoose.model('VendaCentral', {
	tpCentralIndicada: String,
	tpCentralPreferencia: String,
	tpQtdFuncionarios : String,
	tpQtdLigacoesConcorrentes: String,
	tpQtdToquesSimultaneos: String,
	tpQtdHorasGravacao: String,
	blDdr: Boolean,
	blPriorizaSolucao: Boolean,
	blComputadorAtendente: Boolean,
	blSecretariaEletronica: Boolean,
	blFuncaoRonda: Boolean,
	blFluxoAltoFiliais: Boolean,
	blFuncionarioRamalCelular: Boolean,
});