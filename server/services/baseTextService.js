var sobekService = require('./sobekService');
var keyWordHelpService = require('./keyWordHelpService');

module.exports = {

	importText: function (text) {
		sobekService.send(text)
			.then(function (keyword) {
				var listKeyword = keyword.split('\n');
				var listKeywordHelp = listKeyword.map((key) => { return { dsKeyword: key } }).filter((kh) => kh.dsKeyword)
				keyWordHelpService.deleteAll(listKeywordHelp)
				keyWordHelpService.saveList(listKeywordHelp)
				console.log("success")
			}).catch(function (err) {
				console.log("error")
			});

		console.log("importar");
	}
};