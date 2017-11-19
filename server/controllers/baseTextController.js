var baseTextService = require("../services/baseTextService")

module.exports = function (app) {
	const BASE_URL = '/api/base-text';

	app.post(BASE_URL + '/import', function (req, res) {
		baseTextService.importText(req.body.text);
		res.json("asdas");
	});
	
};