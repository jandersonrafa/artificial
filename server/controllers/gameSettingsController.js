var gameSettingsService = require("../services/gameSettingsService")

module.exports = function (app) {
	const BASE_URL = '/api/game-settings';

	app.get(BASE_URL + '/find-settings', function (req, res) {
		gameSettingsService.findSettings().then(function([first, second]) {
			var settings = {
				listKeywordHelp: first,
				numberKeywordGame: second
			}
			res.json(settings); 
		});
	});

	app.post(BASE_URL + '/save', function (req, res) {
		gameSettingsService.save(req.body)
	});

};