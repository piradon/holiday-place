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
  return {
    type: types.SET_WIKI_IMAGE,
    payload,
  };
}

export function setDrawnCity(payload) {
  return {
    type: types.SET_DRAWN_CITY,
    payload,
  };
}

export function setDrawnCityCoords(payload) {
  return {
    type: types.SET_DRAWN_CITY_COORDS,
    payload,
  };
}

export function setWikiCountryInfo(payload) {
  return {
    type: types.SET_WIKI_COUNTRY_INFO,
    payload,
  };
}

export function setWikiCityInfo(payload) {
  return {
    type: types.SET_WIKI_CITY_INFO,
    payload,
  };
}
