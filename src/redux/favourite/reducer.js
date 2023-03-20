import {
  FETCH_FAVOURITE_POKEMON,
  REMOVE_FAVOURITE_POKEMON,
  CREATE_FAVOURITE_POKEMON,
} from "./types";

const initialState = {
  favouritePokemons: [],
  loading: false,
};

const favouritePokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITE_POKEMON:
      return {
        ...state,
        favouritePokemons: action.payload.favouritePokemons,
        loading: action.payload.loading,
      };
    case CREATE_FAVOURITE_POKEMON:
      return {
        ...state,
        favouritePokemons: action.payload.favouritePokemons,
        loading: action.payload.loading,
      };
    case REMOVE_FAVOURITE_POKEMON:
      return {
        ...state,
        favouritePokemons: action.payload.favouritePokemons,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default favouritePokemonReducer;
