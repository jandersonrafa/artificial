var NumberKeywordGame = require('../models/NumberKeywordGame');

module.exports = {

	save: function (numberKeywordGame) {
		if (numberKeywordGame && numberKeywordGame.nrQuantityKeyword) {

			NumberKeywordGame.create(req.body, function (err, numberKeywordGame) {
				if (err)
				console.log("errro")
			});
		}
	},

	load: function () {
		return NumberKeywordGame.find().exec()
	},

	deleteAll: function () {
		NumberKeywordGame.remove({}, function (err) {
			if (err) {
				console.log("erro ao excluir keywords")
			} else {
				console.log("excluido todos keywords")
			}
		});
	},

};