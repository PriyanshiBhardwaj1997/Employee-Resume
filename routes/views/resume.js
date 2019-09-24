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
	locals.data ={
		employee : {}
	};
	let employee = await config.model.findOne({"slug": locals.filters.employee}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean().catch(error => {});
	locals.data.employee.Name=employee.name.first + ' ' + employee.name.last;
	locals.data.employee.email=employee.email;
	locals.data.employee.mobile = employee.mobile;
	locals.data.employee.city = employee.city;
	locals.data.employee.zipCode = employee.zipCode;
	locals.data.employee.address = employee.address;
	locals.data.projects = employee.projects;
	locals.data.skills = employee.skills;
	locals.data.experience = employee.experience;
	


	// Render the view
	view.render('resume');
};
