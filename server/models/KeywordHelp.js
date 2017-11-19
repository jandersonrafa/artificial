var mongoose = require('mongoose');

module.exports = mongoose.model('KeywordHelp', {
	dsKeyword : String,
	dsHelp: String,
});