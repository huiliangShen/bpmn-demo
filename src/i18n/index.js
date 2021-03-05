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
    setTemps(template)
    // Translate
    const Template = (lang === 'zh' && zh[template]) || template
    // console.log(Replacements, template, replacements)
    // Replace
    return Template.replace(/{([^}]+)}/g, function (_, key) {
        return Replacements[key] || '{' + key + '}'
    })
}

function setTemps(template) {
    let temps = localStorage.getItem('temps') || ''
    temps = temps ? temps.split(',') : []
    if (temps.includes(template)) {
        return false
    }
    const obj = {}
    temps.push(template)
    localStorage.setItem('temps', temps.join(','))
    temps.forEach((e) => {
        obj[e] = ''
    })
    console.log(obj)
}
