
var keystone = require('keystone');
var moment = require('moment');
var config = keystone.list('Config');
exports = module.exports = async function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.filters = {
		employee: req.params.employee
	};
	let employeeName = {
		first: locals.filters.employee.split('_')[0],
		last: locals.filters.employee.split('_')[1]
	};
	employeeName.first = employeeName.first[0].toUpperCase() + employeeName.first.slice(1);
	employeeName.last = employeeName.last[0].toUpperCase() + employeeName.last.slice(1);
	console.log('eeeeeeeeeeeeeee', employeeName);
	locals.data ={
		employee : {},
		skills: {},
		experience: {},
		projects: {}
	};
	let employee = await config.model.findOne({"name.first": employeeName.first,"name.last": employeeName.last}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean();
	console.log('jjjjjjjjjjjj',employee);
	locals.data.employee.Name=employee.name.first + ' ' + employee.name.last;
	locals.data.employee.Email=employee.email;
	locals.data.employee['Date Of Birth']= moment(employee.dob).format('DD-MM-YYYY');
	locals.data.employee['Phone No']=employee.mobile;
	locals.data.employee.Address=employee.address;
	locals.data.employee['Zip code']=employee.zipCode;
	locals.data.skills = employee.skills; 
	locals.data.experience = employee.experience;
	locals.data.projects = employee.projects;
	console.log('aaaaaaaaa',locals.data.skills);
	console.log('qqqqqqqqqqqqqqq',locals.data.experience);
	console.log('wwwwwwwwwww',locals.data.projects);
	
	// Render the view
	view.render('index');
};
