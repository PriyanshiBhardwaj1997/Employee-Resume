const keystone  = require('keystone');
const Types = keystone.Field.Types;

const Technologies = new keystone.List('Technologies', {
	track: true,
	map: { name: 'name' }
});

Technologies.add({
        name : {type: String, required: true, index: true},
        image : { type: Types.CloudinaryImage, folder: 'CodalienTechnologies' },
});
Technologies.relationship({ref:'DeveloperContactRequest',path:'tech',refPath:'specialization'});

Technologies.defaultColumns = 'name';
Technologies.register();
