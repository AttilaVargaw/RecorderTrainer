import * as React from 'react'

import { Picker } from '@react-native-picker/picker'
import { observer } from 'mobx-react-lite'
import { View } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import { useStores } from '/src/models'
import { instrumentConfigs } from '/src/models/note-store/note-store'
import TranslationsService from '/src/services/translate'
import { TranslatedText } from '@components/TranslatedText'

const Settings: React.FC = observer (() => {
  const { noteStore, uiStore } = useStores()

  const translator = TranslationsService.translate(uiStore.currentLanguage)

  // TODO needs a popup for german language, if the user wants default style notes
  const onChangeLanguage = (newLanguage: string) => {
    uiStore.setCurrentLanguage(newLanguage)
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Recorder trainer" subtitle={translator('settings')} />
      </Appbar.Header>
      <Title><TranslatedText textKey='instrument'/></Title>
      <Picker selectedValue={noteStore.currentInstrument} onValueChange={noteStore.setCurrentInstrument}>
        {Object.entries(instrumentConfigs).map(([key]) => 
          <Picker.Item value={key} label={translator(key)} key={`instrument-${key}`}/>
        )}
      </Picker>
      <Title><TranslatedText textKey='noteStyle'/></Title>
      <Picker selectedValue={uiStore.currentNoteStyle} onValueChange={uiStore.setCurrentNoteStyle}>
          <Picker.Item value='german' label='A H C D E F G' key={'german'}/>
          <Picker.Item value='english' label='A B C D E F G' key={`english`}/>
          <Picker.Item value='absolut' label='Do Re Mi Fa So La Ti' key={`absolut`}/>
      </Picker>
      <Title><TranslatedText textKey='accidentalStyle'/></Title>
      <Picker selectedValue={uiStore.currentAccidentalStyle} onValueChange={uiStore.setCurrentAccodentalStyle}>
          <Picker.Item value='german' label='is/es' key={'german'}/>
          <Picker.Item value='english' label='#/b' key={`english`}/>
      </Picker>
      <Title><TranslatedText textKey='language'/></Title>
      <Picker selectedValue={uiStore.currentLanguage} onValueChange={onChangeLanguage}>
          <Picker.Item value='en' label={translator('english')} key={`en`}/>
          <Picker.Item value='de' label={translator('german')} key={`de`}/>
      </Picker>
    </View>
  );
})

export default Settings
