import DeTranslations from './translations/de.json'
import EnTranslations from './translations/en.json'

const getTranslations = (language: string): {[key: string]: string} => {
    switch(language) {
        case 'en': return EnTranslations
        case 'de': return DeTranslations
        default: return EnTranslations
    }
}

const TranslationsService = {
    translate: (language: string) => (textKey: string) => getTranslations(language)[textKey] || textKey
}

export default TranslationsService