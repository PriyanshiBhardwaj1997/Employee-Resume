var keystone = require('keystone');
var moment = require('moment');
var config = keystone.list('Config');

exports = module.exports = async function (req, res) {

	//var html = fs.readFileSync('template.html', 'utf8');
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';
	locals.filters = {
		employee: req.params.employee
	};
	
	let employee = await config.model.findOne({"slug": locals.filters.employee}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean().catch(error => {});
	locals.data = employee;
	locals.data.employee = {};
	locals.data.employee.Name=employee.name.first + ' ' + employee.name.last;
	locals.data.employee.Email=employee.email;
	locals.data.employee['Date Of Birth']= moment(employee.dob).format('DD-MM-YYYY');
	locals.data.employee['Phone No']=employee.mobile;
	locals.data.employee.Address=employee.address;
	locals.data.employee['Zip code']=employee.zipCode;
	
	// Render the view
	view.render('index');
};
