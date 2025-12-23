import type { Session } from "@supabase/supabase-js"


interface UserState {
  session: Session | null
}

const initialState: UserState = {
  session: null
}

export { type UserState, initialState };