var VendaCentral = require('./../models/VendaCentral');

module.exports = function (app) {
	const BASE_URL = '/equipamento-central';

	const listEquipamentoMarca = [
		{
			tpMarca: 'Intelbras',
			listEquipamento: [
				{ dsEquipamento: 'Modulares Plus' },
				{ dsEquipamento: 'Impacta 16' },
				{ dsEquipamento: 'Impacta 40' },
				{ dsEquipamento: 'Impacta 68' },
				{ dsEquipamento: 'Impacta 140' },
				{ dsEquipamento: 'Impacta 220' },
				{ dsEquipamento: 'Impacta 300' },
			]
		},
		{
			tpMarca: 'Digistar',
			listEquipamento: [
				{ dsEquipamento: 'XIP 220 Lite' },
				{ dsEquipamento: 'XIP220 Plus' },
				{ dsEquipamento: 'XIP220 Plus(E1)' },
				{ dsEquipamento: 'XIP230 Plus' },
				{ dsEquipamento: 'XIP230 Plus(E1)' },
				{ dsEquipamento: 'XIP240' },
				{ dsEquipamento: 'XIP270' },
				{ dsEquipamento: 'XIP500' },
				{ dsEquipamento: 'XT100' },
				{ dsEquipamento: 'XT130' },
			]
		},
		{
			tpMarca: 'Panasonic',
			listEquipamento: [
				{ dsEquipamento: 'TES32' },
				{ dsEquipamento: 'HTS32' },
				{ dsEquipamento: 'TDE 600' },
				{ dsEquipamento: 'NS500' },
				{ dsEquipamento: 'NS 1000' },
				{ dsEquipamento: 'NS 2000' },
			]
		}
	]
	app.get(BASE_URL + '/api/all-marcas', function (req, res) {
		let listMarcas = []
		listEquipamentoMarca.forEach(function (marca) {
			listMarcas.push(marca.tpMarca)
		})
		res.json(listMarcas);
	});

	app.get(BASE_URL + '/api/equipamentos-by-marca/:tpMarca', function (req, res) {
		var tpMarca = req.params.tpMarca;
		let listEquipamentos = []
		listEquipamentoMarca.forEach(function (marca) {
			if (tpMarca == marca.tpMarca) {
				marca.listEquipamento.forEach(function (equipamento) {
					listEquipamentos.push(equipamento.dsEquipamento)
				})
			}
		})
		res.json(listEquipamentos);
	});

};