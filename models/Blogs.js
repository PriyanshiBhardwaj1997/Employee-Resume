const keystone = require('keystone');
const Types = keystone.Field.Types;

const Blogs = new keystone.List('Blogs',{track:true});

Blogs.add({
	date:{type:Types.Date, required:true, index: true, initial: true},
	title:{type:Types.Text, required:true, initial:true},
	description:{type:Types.Text},
	blogUrl: {type:Types.Url},
	image:{type:Types.CloudinaryImage, folder:'CodalienEmployee'},
});

Blogs.defaultColumns = 'date, title, description, blogUrl, image';
Blogs.register();
