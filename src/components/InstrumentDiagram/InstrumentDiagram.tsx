import React from 'react'

import { InstrumentState } from './RecorderState'
import { RecorderDiagram } from './Recorder-diagram'
import { HoleStates } from './RecorderDiagramProps'

type InstrumentDiagramProps = {
    currentInstrumentState: ReturnType<typeof InstrumentState>
    currentInstrument: string
}

export const InstrumentDiagram =  ({ currentInstrumentState, currentInstrument }: InstrumentDiagramProps): JSX.Element | null => {
    switch (currentInstrument) {
        case 'baroqueRecorder':
            return <RecorderDiagram {...{ holeStates: currentInstrumentState.holeStates as HoleStates }} />
        default:
            return <RecorderDiagram {...{ holeStates: currentInstrumentState.holeStates as HoleStates }} />
    }
}
