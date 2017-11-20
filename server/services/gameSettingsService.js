var keyWordHelpService = require('./keyWordHelpService');
var numberKeywordGameService = require('./numberKeywordGameService');

module.exports = {

	findSettings: function () {
		const promises = [
			keyWordHelpService.findAll(),
			numberKeywordGameService.load()
		];
		return Promise.all(promises)
	},

	save: function (settings) {
		numberKeywordGameService.deleteAll()
		numberKeywordGameService.save(settings.numberKeywordGame)
		keyWordHelpService.deleteAll()
		keyWordHelpService.saveList(settings.listKeywordHelp)
	}
};