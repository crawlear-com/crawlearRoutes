import { vi } from "vitest";

vi.mock("@/database/supabaseClient", () => ({
  default: {}, 
  ITEMS_PAGE: 10,
}));
