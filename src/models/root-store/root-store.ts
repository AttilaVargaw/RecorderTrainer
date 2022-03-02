import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { NoteStore } from '../../models/note-store/note-store'
import { UiStore } from '../uiStore/uiStore'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  noteStore: NoteStore,
  uiStore: UiStore
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
