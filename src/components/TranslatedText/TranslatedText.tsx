import * as React from 'react'

import { observer } from "mobx-react-lite"
import { useStores } from '../../models'
import TranslationsService from '../../services/translate'

export const TranslatedText = observer(({textKey}: {textKey: string}) => {
    const { uiStore } = useStores()

    return <>{TranslationsService.translate(uiStore.currentLanguage)(textKey) }</>
})
