
module.exports = function (app) {
    require('./baseTextController.js')(app);
    require('./gameSettingsController.js')(app);
    require('./playGameController.js')(app);
};