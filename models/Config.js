const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Projects Model
 * ==========
 */
const Config = new keystone.List('Config', {
	track: true,
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Config.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, required: true, initial: true },
	mobile: { type: Types.Number, required: true, initial: true },
	designation: { type: Types.Text, required: true, initial: true },
	title: { type: Types.Text, required: true, initial: true },
	subTitle: { type: Types.Text, required: true, initial: true },
	aim: { type: Types.Text, required: true, initial: true },
	dob: { type: Types.Date, required: true, initial: true },
	address: { type: Types.Text, required: true, initial: true },
	zipCode: { type: Types.Number, required: true, initial: true },
	website: { type: Types.Url, required: true, initial: true },
	city: { type: Types.Text, required: true, initial: true },
	technologies: { type: Types.Relationship, ref: 'Technologies', many: true },
	projects: {
		type: Types.List, fields: {
			skill: { type: Types.Relationship, ref: 'Project' },
			technologies: { type: Types.Relationship, ref: 'Technologies', many: true },
		},
	},
	skills: {
		type: Types.List, fields: {
			skill: { type: Types.Relationship, ref: 'Technologies' },
			rating: { type: Types.Number, required: true, initial: true },
		},
	},
	socialLinks: {
		type: Types.List, fields: {
			website: { type: Types.Url, required: true, initial: true },
			icon: { type: Types.Text, required: true, initial: true },
		},
	},
	userImages: { type: Types.TextArray },

});
/**
 * Registration
 */
Config.defaultColumns = 'name, url, technologies, image';
Config.register();
