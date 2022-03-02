import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { useStores } from "/src/models"

export const NoteStyles: { [key: string]: { [key: string]: string } } = {
    english: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G' },
    german: { A: 'A', B: 'H', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G' },
    absolut: { A: 'Do', B: 'Re', C: 'Mi', D: 'Fa', E: 'So', F: 'La', G: 'Ti' }
}

export const NoteAccidentalStyles: { [key: string]: { [key: string]: string } } = {
    german: { flat: 'is', sharp: 'es' },
    english: { flat: 'b', sharp: '#' },
}

export const defaultStyle = 'english'

export const TranslatedNote = observer(({note, accidental}: {note: string, accidental?: string}) => {
    const { uiStore } = useStores()

    const { currentNoteStyle, currentAccidentalStyle } = uiStore
    const styledNote = NoteStyles[currentNoteStyle || defaultStyle][note]

    const noteText = `${styledNote}${accidental ? NoteAccidentalStyles[currentAccidentalStyle || defaultStyle][accidental!] : ''}`

    return <>{noteText}</>
})