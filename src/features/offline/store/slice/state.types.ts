interface OfflineState {
  isOffline: boolean
}

const initialState: OfflineState = {
  isOffline: false
}

export { type OfflineState, initialState };