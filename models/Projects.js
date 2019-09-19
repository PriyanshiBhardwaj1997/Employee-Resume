const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Projects Model
 * ==========
 */
const Project = new keystone.List('Project',{track:true});

Project.add({
	name: { type: Types.Text, required: true, index: true },
	url: { type: Types.Text, required: true, initial:true},
	technologies: { type: Types.Relationship, required: true, ref: 'Technologies' , many: true, initial:true},
	image: { type: Types.CloudinaryImage, required:true, initial:true },
	// folder: '/CodalienProjects',
});


/**
 * Registration
 */
Project.defaultColumns = 'name, url, technologies, image';
Project.register();
