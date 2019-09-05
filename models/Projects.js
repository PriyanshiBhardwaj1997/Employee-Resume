const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Projects Model
 * ==========
 */
const Project = new keystone.List('Project');

Project.add({
	name: { type: Types.Name, required: true, index: true },
	url: { type: Types.Text },
	technologies: { type: Types.Relationship, ref: 'Technology' },
	image: { type: Types.CloudinaryImage },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Project.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Project.defaultColumns = 'name, url, technologies, image';
Project.register();
