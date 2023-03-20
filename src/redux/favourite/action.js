import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import firestore from "./../../firebase/config";

import {
  FETCH_FAVOURITE_POKEMON,
  CREATE_FAVOURITE_POKEMON,
  REMOVE_FAVOURITE_POKEMON,
} from "./types";

async function getAllFavouritePokemons() {
  const favourites = [];
  const data = await query(collection(firestore, "pokemons"));
  onSnapshot(data, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      favourites.push(doc.data());
    });
  });
  return favourites;
}

export function fetchFavouritePokemon() {
  return async (dispatch, getState) => {
    const favourites = await getAllFavouritePokemons();
    dispatch({
      type: FETCH_FAVOURITE_POKEMON,
      payload: {
        favouritePokemons: favourites,
        loading: false,
      },
    });
  };
}

export function createFavouritePokemon(data) {
  return async (dispatch, getState) => {
    const ref = collection(firestore, "pokemons");
    const res = await addDoc(ref, data);
    if (res) {
      alert("success added favourite pokemon");
      const favourites = await getAllFavouritePokemons();
      dispatch({
        type: CREATE_FAVOURITE_POKEMON,
        payload: {
          favouritePokemons: favourites,
        },
      });
    } else {
      alert(JSON.stringify(res));
    }
  };
}

export function removeFavouritePokemon(item) {
  return async (dispatch, getState) => {
    const docRef = doc(firestore, "pokemons", item.uuid);
    const res = await deleteDoc(docRef);
    if (res) {
      alert(`${item.pokemon_name} has been deleted successfully.`);
      const favourites = await getAllFavouritePokemons();
      dispatch({
        type: REMOVE_FAVOURITE_POKEMON,
        payload: {
          favouritePokemons: favourites,
          loading: false,
        },
      });
    } else {
      alert(JSON.stringify(res));
    }
  };
}
