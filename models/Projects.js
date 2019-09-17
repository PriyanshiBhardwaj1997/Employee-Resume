const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Projects Model
 * ==========
 */
const Project = new keystone.List('Project',{track:true});

Project.add({
	name: { type: Types.Name, required: true, index: true },
	url: { type: Types.Text },
	technologies: { type: Types.Relationship, ref: 'Technologies' , many: true},
	image: { type: Types.CloudinaryImage, folder: '/CodalienProjects'},
});


/**
 * Registration
 */
Project.defaultColumns = 'name, url, technologies, image';
Project.register();
