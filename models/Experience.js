const keystone= require('keystone');
const Types = keystone.Field.Types;

const Experience = keystone.List('Experience',{track:true});

Experience.add({
	duration: {
		start:{type: Types.Date, required:true, initial:true},
		end: {type: Types.Date, required:true, initial:true}
	},
	designation: {type:Types.Text, required:true, initial:true},
	company: {type:Types.Text, required:true, initial:true},
	description:{type:Types.Text, required:true, initial:true},
});
Experience.defaultColumns= "company, designation,duration, description";
Experience.register();
