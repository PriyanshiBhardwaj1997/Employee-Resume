var keystone = require('keystone');
var moment = require('moment');
var config = keystone.list('Config');
exports = module.exports = async function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'resume';


	// Render the view
	view.render('resume');
};
