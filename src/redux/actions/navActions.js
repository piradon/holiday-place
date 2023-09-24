import { types } from "../types/nav";

export function goWikiPhase(payload) {
  return {
    type: types.GO_WIKI_PHASE,
    payload,
  };
}
