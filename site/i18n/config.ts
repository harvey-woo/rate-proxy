import { createI18n } from 'vue-i18n'

export default defineI18nConfig(() =>
  createI18n({
    fallbackLocale: 'en',
    allowHtml: true,
  }),
)
