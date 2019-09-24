var keystone = require('keystone');
var moment = require('moment');
var config = keystone.list('Config');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

exports = module.exports = async function (req, res) {

	//var html = fs.readFileSync('template.html', 'utf8');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.filters = {
		employee: req.params.employee
	};
	// let employeeName = {
	// 	first: locals.filters.employee.split('_')[0],
	// 	last: locals.filters.employee.split('_')[1]
	// };
	// employeeName.first = employeeName.first[0].toUpperCase() + employeeName.first.slice(1);
	// employeeName.last = employeeName.last[0].toUpperCase() + employeeName.last.slice(1);
	locals.data ={
		employee : {},
		skills: {},
		experience: {},
		projects: {},
		images: '',
		socialLinks:{},
		userImages:[],
		slug:locals.filters.employee
	};
	let employee = await config.model.findOne({"slug": locals.filters.employee}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean().catch(error => {});
	console.log('aaaaaaaaaaaa',employee);
	locals.data.employee.Name=employee.name.first + ' ' + employee.name.last;
	locals.data.employee.Email=employee.email;
	locals.data.employee['Date Of Birth']= moment(employee.dob).format('DD-MM-YYYY');
	locals.data.employee['Phone No']=employee.mobile;
	locals.data.employee.Address=employee.address;
	locals.data.employee['Zip code']=employee.zipCode;
	locals.data.city = employee.city;
	locals.data.employee.website = employee.website;
	locals.data.employee.mobile =employee.mobile;
	locals.data.skills = employee.skills; 
	locals.data.experience = employee.experience;
	locals.data.projects = employee.projects;
	locals.data.image =employee.image;
	locals.data.title = employee.title;
	locals.data.aim = employee.aim;
	locals.data.socialLinks = employee.socialLinks;
	locals.data.userImages = employee.userImages;
	
	function doSomething (e) {
		e.preventDefault();
		console.log('I am inside doSomething');
		// window.print();
	}
	// Render the view
	view.render('index');
};
