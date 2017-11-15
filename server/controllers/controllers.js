
module.exports = function (app) {
    require('./homeController.js')(app);
    require('./vendaCentralController.js')(app);
    require('./equipamentoCentralController.js')(app);
};