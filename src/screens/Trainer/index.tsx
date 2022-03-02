import * as React from 'react'
import { View } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { observer } from 'mobx-react-lite'

import { NotesMenu } from '@components/NotesMenu'
import { useStores } from '/src/models'
import TranslationsService from '/src/services/translate';
import { InstrumentDiagram } from '@components/InstrumentDiagram';

const Trainer = observer(() => {
  const { noteStore: { currentInstrument, currentInstrumentState }, uiStore: {currentLanguage} } = useStores()
  const navigation = useNavigation()

  const translator = TranslationsService.translate(currentLanguage)

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Recorder trainer" subtitle={translator(currentInstrument)}/>
        <Appbar.Action icon="dots-vertical" onPress={() => { navigation.navigate('Settings',{}) }} />
      </Appbar.Header>
      { currentInstrument && currentInstrumentState && <InstrumentDiagram currentInstrument={currentInstrument} currentInstrumentState={currentInstrumentState} />}
      <NotesMenu />
    </View>
  )
})

export default Trainer
