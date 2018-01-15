import i18next from 'i18next';

const resources = {
	en: {
		translation: {
			foo: 'foo',
			bar: '<1><0>bar</0></1>',
			baz: '<1><0>{{count}}</0></1>',
			qux: 'qux<1></1>',
			qux_plural: 'quxes<1></1>',
			quux: '<1><0>{{name, uppercase}}</0></1>',
		},
		nico: {
			nico: 'nii',
		},
	},
};

function format(value, format, lng) {
	if (format === 'uppercase') return value.toUpperCase();
	return value;
}

i18next.init({
	lng: 'en',
	resources,
	interpolation: {
		format: format
	}
});

export { i18next as default, resources };
