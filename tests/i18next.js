import i18next from 'i18next';

const resources = {
  en: {
    translation: {
      foo: 'bar',
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

export { resources, i18next as default };
