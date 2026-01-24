
interface ThemeState {
  selectedTheme: string
}

const initialState: ThemeState = {
  selectedTheme: "light"
}

export { type ThemeState, initialState };