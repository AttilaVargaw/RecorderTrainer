import { types } from 'mobx-state-tree'

export const UiStore = types.model('UiStore', {
  currentNoteStyle: types.string,
  currentAccidentalStyle: types.string,
  currentLanguage: types.enumeration('Language', ['en', 'de']),
}).actions(self => ({
  setCurrentNoteStyle: (newNoteStyle: string) => {
    self.currentNoteStyle = newNoteStyle

    if(newNoteStyle === 'absolut') {
      self.currentAccidentalStyle = 'english'
    }
  },
  setCurrentAccodentalStyle: (newAccidentalStyle: string) => {
    self.currentAccidentalStyle = newAccidentalStyle
  },
  setCurrentLanguage: (newLanguage: string) => {
    self.currentLanguage = newLanguage
  }
}))
