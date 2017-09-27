var VendaCentral = require('./../models/VendaCentral');

module.exports = function (app) {
	const BASE_URL = '/venda-central';

	// api ---------------------------------------------------------------------
	// get all vendaCentral
	app.get(BASE_URL + '/api/find', function (req, res) {

		// use mongoose to get all vendaCentral in the database
		VendaCentral.find(function (err, vendaCentral) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(vendaCentral); // return all vendaCentral in JSON format
		});
	});

	// create todo and send back all vendaCentral after creation
	app.post(BASE_URL + '/api/create', function (req, res) {

		// create a todo, information comes from AJAX request from Angular
		VendaCentral.create(req.body, function (err, todo) {
			if (err)
				res.send(err);

			// get and return all the vendaCentral after you create another
			VendaCentral.find(function (err, vendaCentral) {
				if (err)
					res.send(err)
				res.json(vendaCentral);
			});
		});

	});

	// delete a todo
	app.delete(BASE_URL + '/api/delete/:_id', function (req, res) {
		VendaCentral.remove({
			_id: req.params._id
		}, function (err, todo) {
			if (err) {
				res.send(err);
			} else {

				// get and return all the vendaCentral after you create another
				VendaCentral.find(function (err, vendaCentral) {
					if (err) {
						res.send(err)
					} else {
						res.json(vendaCentral);
					}
				});
			}
		});
	});

};