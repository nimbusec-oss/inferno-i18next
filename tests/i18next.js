import i18next from 'i18next';

// with i18next:21 the pluralization api changed, this would require the "count" prop even for singular messages. 
// by not sticking to their migration suggestion and keeping the singular key without "_one", it still works.
// see t.Test.js for tests regarding this case. a "count" prop can be added, but will be ignored.
// https://www.i18next.com/translation-function/plurals

const resources = {
	en: {
		translation: {
			foo: 'foo',
			bar: '<1>bar</1>',
			baz: '<1>{{count}}</1>',
			qux: 'qux<1></1>',
			qux_other: 'quxes<1></1>',
			quux: '<1>{{name, uppercase}}</1>',
			userMessagesUnread: 'Hello <1>{{name}}</1>, you have {{count}} unread messages. <3>Go to messages</3>.',
			userMessagesUnread_other: 'Hello <1>{{name}}</1>, you have {{count}} unread messages. <3>Go to messages</3>.'
		},
		nico: {
			nico: 'nii',
		},
	},
};

i18next.init({
	lng: 'en',
	resources,
});
i18next.services.formatter.add('uppercase', (value, lng, options) => {
  return value.toUpperCase();
});

export { i18next as default, resources };
