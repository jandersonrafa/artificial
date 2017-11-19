module.exports = function (app) {
	const BASE_URL = '/api/game-settings';

	app.get(BASE_URL + '/find-settings', function (req, res) {
		console.log("find settings")
		res.json("asdsa");
	});

	app.post(BASE_URL + '/save', function (req, res) {
		console.log("save settings")
	});

};