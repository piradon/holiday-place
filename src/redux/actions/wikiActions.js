import { types } from "../types/wiki";

export function setDrawnCountry(payload) {
  return {
    type: types.SET_DRAWN_COUNTRY,
    payload,
  };
}

export function setDrawnCountries(payload) {
  return {
    type: types.SET_DRAWN_COUNTRIES,
    payload,
  };
}

export function setWikiContent(payload) {
  return {
    type: types.SET_WIKI_CONTENT,
    payload,
  };
}

export function setWikiImage(payload) {
  console.log(payload)
  return {
    type: types.SET_WIKI_IMAGE,
    payload,
  };
}
