var KeywordHelp = require('../models/KeywordHelp');

module.exports = {

	saveList: function (listKeywordHelp) {
		KeywordHelp.insertMany(listKeywordHelp, function (err, key) {
			if (err) {
				res.send(err);
			} else {
				console.log("asdsad")
			}
		});
	},

	deleteAll: function () {
		KeywordHelp.remove({}, function (err) {
			if (err) {
				console.log("erro ao excluir keywords")
			} else {
				console.log("excluido todos keywords")
			}
		});
	},

	delete: function (id) {
		KeywordHelp.remove({
			_id: id
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}
		});
	},

	findAll: function (keywordHelp) {
		return KeywordHelp.find().exec()
	},
};