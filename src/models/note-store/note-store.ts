import { flow, Instance, types } from 'mobx-state-tree'

import { HoleStates, InstrumentState } from '@components/InstrumentDiagram/RecorderState'

import Sound from 'react-native-sound'
import { maxBy, minBy, pickBy } from 'lodash'

export type InstrumentConfig = {
  noteStates: { [index: string]: HoleStates }
  instrumentFileName: string,
  defaultNote: string
}

// WIP Burned in the moment, make it dynamic in the future
export const instrumentConfigs: { [index: string]: InstrumentConfig } = {
  baroqueRecorder: {
    defaultNote: 'C5',
    noteStates: {
      'C5': InstrumentState({ holeStates: {}, octave: 5}),
      'Db5': InstrumentState({ holeStates: ({ H71: 0 }), octave: 5 }),
      'D5': InstrumentState({ holeStates: ({ H7: 0, H71: 0 }), octave: 5 }),
      'Eb5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H61: 0 }), octave: 5 }),
      'E5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H61: 0, H6: 0 }), octave: 5 }),
      'F5': InstrumentState({ holeStates: ({ H5: 0 }), octave: 5 }),
      'Gb5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H4: 0 }), octave: 5 }),
      'G5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H61: 0, H6: 0, H4: 0, H5: 0 }), octave: 5 }),
      'Ab5': InstrumentState({ holeStates: ({ H3: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'A5': InstrumentState({ holeStates: ({ H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'Bb5': InstrumentState({ holeStates: ({ H2: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'B5': InstrumentState({ holeStates: ({ H2: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'C6': InstrumentState({ holeStates: ({ H1: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 6 }),
      'Db6': InstrumentState({ holeStates: ({ H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0}), octave: 6 }),
      'D6': InstrumentState({ holeStates: ({ H0: 0 ,H1: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0}), octave: 6 }),
      'Eb6': InstrumentState({ holeStates: ({ H1: 0, H7: 0, H71: 0, H0: 0}), octave: 6 }),
      'E6': InstrumentState({ holeStates: ({ H0: 1, H7: 0, H71: 0, H6: 0, H61: 0}), octave: 6 }),
      'F6': InstrumentState({ holeStates: ({ H0: 1, H5: 0, H71: 0, H7: 0}), octave: 6 }),
      'Gb6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'G6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'Ab6': InstrumentState({ holeStates: ({ H0: 1, H3: 0, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'A6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H3: 0, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'Bb6': InstrumentState({ holeStates: ({ H0: 1,H3: 0, H4: 0, H71: 0, H7: 0}), octave: 6 }),
      'B6': InstrumentState({ holeStates: ({ H0: 1, H3: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'C7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H3: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 7 }),
      'Db7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H61: 0, H6: 0}), octave: 7 }),
      'D7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H71: 0, H7: 0, H5: 0}), octave: 7 })
    },
    instrumentFileName: 'recorder'
  }, 
  germanRecorder: {
    defaultNote: 'C5',
    noteStates: {
      'C5': InstrumentState({ holeStates: {}, octave: 5}),
      'Db5': InstrumentState({ holeStates: ({ H71: 0 }), octave: 5 }),
      'D5': InstrumentState({ holeStates: ({ H7: 0, H71: 0 }), octave: 5 }),
      'Eb5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H61: 0 }), octave: 5 }),
      'E5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H61: 0, H6: 0 }), octave: 5 }),
      'F5': InstrumentState({ holeStates: ({ H7: 0, H71: 0, H5: 0, H6: 0, H61: 0 }), octave: 5 }),
      'Gb5': InstrumentState({ holeStates: ({ H4: 0 }), octave: 5 }),
      'G5': InstrumentState({ holeStates: ({ H6: 0, H61: 0,H7: 0, H71: 0, H5: 0, H4: 0 }), octave: 5 }),
      'Ab5': InstrumentState({ holeStates: ({ H3: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'A5': InstrumentState({ holeStates: ({ H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'Bb5': InstrumentState({ holeStates: ({ H2: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),      
      'B5': InstrumentState({ holeStates: ({ H2: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 5 }),
      'C6': InstrumentState({ holeStates: ({ H1: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0 }), octave: 6 }),
      'Db6': InstrumentState({ holeStates: ({ H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0}), octave: 6 }),
      'D6': InstrumentState({ holeStates: ({ H0: 0 ,H1: 0, H3: 0, H4: 0, H5: 0, H6: 0, H61: 0, H7: 0, H71: 0}), octave: 6 }),
      'Eb6': InstrumentState({ holeStates: ({ H1: 0, H7: 0, H71: 0, H0: 0}), octave: 6 }),
      'E6': InstrumentState({ holeStates: ({ H0: 1, H7: 0, H71: 0, H6: 0, H61: 0}), octave: 6 }),
      'F6': InstrumentState({ holeStates: ({ H0: 1, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'Gb6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'G6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'Ab6': InstrumentState({ holeStates: ({ H0: 1, H4: 0}), octave: 6 }),
      'A6': InstrumentState({ holeStates: ({ H0: 1, H4: 0, H3: 0, H5: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'Bb6': InstrumentState({ holeStates: ({ H0: 1,H3: 0, H4: 0, H71: 0, H7: 0}), octave: 6 }),
      'B6': InstrumentState({ holeStates: ({ H0: 1, H3: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 6 }),
      'C7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H3: 0, H71: 0, H7: 0, H61: 0, H6: 0}), octave: 7 }),
      'Db7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H61: 0, H6: 0}), octave: 7 }),
      'D7': InstrumentState({ holeStates: ({ H0: 1, H2: 0, H71: 0, H7: 0, H5: 0}), octave: 7 })
    },
    instrumentFileName: 'recorder'
  }
}

const NoteBase = types.model({
  noteLabel: types.string,
  frequency: types.number,
  id: types.string
})

export type NoteType = Instance<typeof NoteBase>

export const NoteStore = types.model('NoteStore', {
  currentNote: types.string,
  currentInstrument: types.string,
  currentOctave: types.number
}).actions(self => ({
  setCurrentOctave: flow(function* (newOctave: number) {
    self.currentOctave = newOctave
  }),
  setCurrentNote: flow(function* (id: string) {
    self.currentNote = id
  }),
  playCurrentTone: flow(function* () {
    if (self.currentNote && self.currentInstrument) {
      const tone = new Sound(`${instrumentConfigs [self.currentInstrument].instrumentFileName}_${self.currentNote}.mp3`, '',(error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        tone.play()
      });
    }
  }),
  stopCurrentNote() {

  },
  setCurrentInstrument(instrumentId: string) {
    self.currentInstrument = instrumentId
    self.currentNote = instrumentConfigs[instrumentId].defaultNote
  }
})).views(self => ({
  get currentInstrumentConfig() {
    const { currentInstrument, currentNote } = self

    if (!currentInstrument || !currentNote || !currentInstrument) return

    return instrumentConfigs[currentInstrument]
  },
  get currentInstrumentState() {
    const { currentInstrument, currentNote } = self
    if (!currentInstrument || !currentNote) return

    return instrumentConfigs[currentInstrument].noteStates[currentNote]
  },
  get currentMinOctave() {
    const { currentInstrument } = self

    //find the lowest octave number in the note list
    return minBy(Object.values(instrumentConfigs[currentInstrument].noteStates), note => note.octave)?.octave || 0
  },
  get currentMaxOctave() {
    const { currentInstrument } = self
     
    //find the highest octave number in the note list
    return maxBy(Object.values(instrumentConfigs[currentInstrument].noteStates), note => note.octave)?.octave || 0
  },
  get currentNotes() {
    const { currentOctave, currentInstrument } = self

    return pickBy(instrumentConfigs[currentInstrument].noteStates, note => note.octave === currentOctave)
  }
}))
