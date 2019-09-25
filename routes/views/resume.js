var keystone = require('keystone');
var moment = require('moment');
var config = keystone.list('Config');
exports = module.exports = async function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'resume';
	locals.filters = {
		employee: req.params.employee
	};
	
	let employee = await config.model.findOne({"slug": locals.filters.employee}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean().catch(error => {});
	locals.data = employee;
	
	// Render the view
	view.render('resume');
};
