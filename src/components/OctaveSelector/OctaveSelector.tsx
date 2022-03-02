import React from 'react'
import Slider from '@react-native-community/slider'
import { useStores } from '/src/models'
import { observer } from 'mobx-react-lite'

export const OctaveSelector = observer((): JSX.Element => {
  const { noteStore } = useStores()

  const { currentMaxOctave, currentMinOctave, currentOctave } = noteStore

  return <Slider
    style={{}}
    minimumValue={currentMinOctave}
    maximumValue={currentMaxOctave}
    step={1}
    value={currentOctave}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
    onSlidingComplete={noteStore.setCurrentOctave}
  />
})
