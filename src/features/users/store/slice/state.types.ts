import type { Session } from "@supabase/supabase-js"

interface UserState {
  session: Session | null,
  isLoading: boolean
}

const initialState: UserState = {
  session: null,
  isLoading: true
}

export { type UserState, initialState };