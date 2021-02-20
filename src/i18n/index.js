import zh from './zh'

export default {
    // locale: 'en',
    language: {
        zh
    }
}

export function customTranslate(template, replacements) {
    const Replacements = replacements || {}
    const lang = localStorage.getItem('locale')
    if (!lang) {
        return template
    }
    // Translate
    const Template = (lang === 'zh' && zh[template]) || template
    // console.log(Replacements, template, replacements)
    // Replace
    return Template.replace(/{([^}]+)}/g, function (_, key) {
        return Replacements[key] || '{' + key + '}'
    })
}
