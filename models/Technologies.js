const keystone  = require('keystone');
const Types = keystone.Field.Types;

const Technologies = new keystone.List('Technologies',{track:true});

Technologies.add({
        name : {type: String, required: true, index: true},
        image : { type: Types.CloudinaryImage, folder: 'path/to/image' },
        class: {type: String, required:true, initial: true},
        type: {type: String, required:true, initial: true}
});
Technologies.relationship({ref:'DeveloperContactRequest',path:'tech',refPath:'specialization'});

Technologies.defaultColumns = 'name';
Technologies.register();
