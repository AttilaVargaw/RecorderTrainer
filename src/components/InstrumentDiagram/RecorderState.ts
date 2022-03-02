
export type HoleStates = { holeStates: {[index: string]: number}, octave: number  }

export const InstrumentState = ({ holeStates, octave }: {holeStates: {[index: string]: number}, octave: number}) => 
  ({ holeStates, octave })
