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
		userImages:[]
	};
	let employee = await config.model.findOne({"slug": locals.filters.employee}).populate({path: 'skills.skill'}).populate({path: 'projects.project'}).lean().catch(error => {});
	// console.log('aaaaaaaaaaaa',locals.data.userImage);
	locals.data.employee.Name=employee.name.first + ' ' + employee.name.last;
	locals.data.employee.Email=employee.email;
	locals.data.employee['Date Of Birth']= moment(employee.dob).format('DD-MM-YYYY');
	locals.data.employee['Phone No']=employee.mobile;
	locals.data.employee.Address=employee.address;
	locals.data.employee['Zip code']=employee.zipCode;
	locals.data.city = employee.city;
	locals.data.skills = employee.skills; 
	locals.data.experience = employee.experience;
	locals.data.projects = employee.projects;
	locals.data.image =employee.image;
	locals.data.title = employee.title;
	locals.data.aim = employee.aim;
	locals.data.userImages = employee.userImages;
	console.log('aaaaaaaaaaaa',locals.data.userImages);
	//console.log('aaaaaaaaaaaa',locals.data.projects);
	// var source   = document.querySelector("content").innerHTML;
	// var template = Handlebars.compile(source);
	// var htmlCompile = template(context);
	// var html = fs.readFileSync('htmlCompile', 'utf8');

	function doSomething () {
		console.log('I am inside doSomething');
		window.print();
	}
	// function demoFromHTML() {
	// 	console.log('insideeeeeeeeeeeeeeeeee pdddddddddddfffffffffffff');
	// 	var pdf = new jsPDF('p', 'pt', 'letter');
	// 	// source can be HTML-formatted string, or a reference
	// 	// to an actual DOM element from which the text will be scraped.
	// 	source = $('#content')[0];
	//
	// 	// we support special element handlers. Register them with jQuery-style 
	// 	// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
	// 	// There is no support for any other type of selectors 
	// 	// (class, of compound) at this time.
	// 	specialElementHandlers = {
	// 		// element with id of "bypass" - jQuery style selector
	// 		'#bypassme': function (element, renderer) {
	// 			// true = "handled elsewhere, bypass text extraction"
	// 			return true
	// 		}
	// 	};
	// 	margins = {
	// 		top: 80,
	// 		bottom: 60,
	// 		left: 40,
	// 		width: 522
	// 	};
	// 	// all coords and widths are in jsPDF instance's declared units
	// 	// 'inches' in this case
	// 	pdf.fromHTML(
	// 		source, // HTML string or DOM elem ref.
	// 		margins.left, // x coord
	// 		margins.top, { // y coord
	// 			'width': margins.width, // max width of content on PDF
	// 			'elementHandlers': specialElementHandlers
	// 		},
	//
	// 		function (dispose) {
	// 			// dispose: object with X, Y of the last line add to the PDF 
	// 			//          this allow the insertion of new lines after html
	// 			pdf.save('Test.pdf');
	// 		}, margins);
	// 	console.log('reached to pdf');
	// }
	
	
	
	
	// Render the view
	view.render('index');
};
