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

};