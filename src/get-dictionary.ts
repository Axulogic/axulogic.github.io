import 'server-only'
import type { Locale } from './i18n-config'
const dictionaries = {
  'en-US': () => import('../dictionaries/en-us.json').then(module => module.default),
  'pt-BR': () => import('../dictionaries/pt-br.json').then(module => module.default),
}
export const getDictionary = async (locale: Locale) => {
    const loader = dictionaries[locale] || dictionaries['en-US'];
    return loader();
}
