import * as React from 'react'
import { Text, StyleSheet, Dimensions, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Button } from 'react-native-paper'

import { useStores } from '/src/models'
import { OctaveSelector } from '@components/OctaveSelector';
import { TranslatedNote } from '@components/TranslatedNote'
import { TranslatedText } from '@components/TranslatedText'

const buttonOffsetY = 50

const calculatePostion = (center: number, radius: number, symbolSize: number, offsetY: number) => ({ angle }: { angle: number }) => {
    const top = (-radius * Math.cos(angle) + center - symbolSize / 2) + offsetY
    const left = radius * Math.sin(angle) + center - symbolSize / 2

    return { top, left }
}

const styles = StyleSheet.create({
    note: {
        position: 'absolute'
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 0,
    },
    octaveContainer: {
        marginTop: buttonOffsetY / 2
    }
})

export const NotesMenu = observer((): JSX.Element | null => {
    const { noteStore } = useStores()
    const { currentNote, currentNotes, currentOctave } = noteStore

    const { width } = Dimensions.get('window')

    const centeredCalculatePosition = calculatePostion(width / 2, width / 3, 16 * 3, buttonOffsetY)

    const onNoteClick = (note: string) => () => noteStore.setCurrentNote(note)

    const onPlayClick = () => {
        noteStore.playCurrentTone()
    }

    return <View>
        <View style={{ position: 'relative' }}>
            <Button style={{ position: 'absolute', top: (width / 2 - 16 * 3 / 2) + buttonOffsetY , left: width / 2 - 16 * 3 / 2 }} onPress={onPlayClick}><Text>&gt;</Text></Button>
            {Object.entries(currentNotes || {}).map(([key], index, arr) => {
                const style = {
                    ...styles.note,
                    ...centeredCalculatePosition({ angle: (2 * Math.PI / arr.length) * index })
                }

                const noteName = key[0]
                const accidental = key.includes('b') ? 'flat' : (key.includes('#') ? 'sharp' : undefined)
                const octave = key[key.length - 1]

                return <Button uppercase={false} color={currentNote === key ? 'red' : 'blue'} onPress={onNoteClick(key)} style={style} key={`note-${index}`}>
                    <TranslatedNote note={noteName} accidental={accidental} />{octave}
                </Button>
            })}
        </View>
        <View style={styles.octaveContainer}>
            <Text style={styles.text}><TranslatedText textKey='octave' /> {currentOctave}</Text>
            <OctaveSelector />
        </View>
    </View>
})
