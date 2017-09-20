var mongoose = require('mongoose');

module.exports = mongoose.model('VendaCentral', {
	idVendaCentral: mongoose.Schema.Types.ObjectId,
	centralIndicada: {
		idCentral: Number,
		nmCentral: String,
	},
	tpQtdFuncionarios : String,
	tpQtdLigacoesConcorrentes: String,
	tpQtdToquesSimultaneos: String,
	tpQtdHorasGravacao: String,
	blDdr: Boolean,
	blPriorizaSolução: Boolean,
	blComputadorAtendente: Boolean,
	blSecretariaEletronica: Boolean,
	blFuncaoRonda: Boolean,
	blFluxoAltoFiliais: Boolean,
	blFuncionarioRamalCelular: Boolean,
});