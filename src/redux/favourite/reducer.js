import {
  FETCH_FAVOURITE_POKEMON,
  REMOVE_FAVOURITE_POKEMON,
  CREATE_FAVOURITE_POKEMON,
} from "./action";

const initialState = {
  favouritePokemons: [],
};

const favouritePokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITE_POKEMON:
      return { favouritePokemons: [] };
    default:
      return initialState;
  }
};

export default favouritePokemonReducer;
