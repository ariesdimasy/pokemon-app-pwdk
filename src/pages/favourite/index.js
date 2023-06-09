import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import style from "./index.module.css";

import CardPokemon from "../../components/CardPokemon";
import FavouriteBtn from "../../components/FavouriteBtn";
import ReadMoreBtn from "../../components/ReadMoreBtn";

import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firestore from "./../../firebase/config";
import LoadingScreen from "../../components/LoadingScreen";

export default function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const favourites = [];
    const data = await query(collection(firestore, "pokemons"));
    onSnapshot(data, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        favourites.push(doc.data());
      });
      setFavourites(favourites);
      setLoading(false);
    });
  };

  const deleteFavourite = async (item) => {
    setLoading(true);
    const docRef = doc(firestore, "pokemons", item.uuid);
    await deleteDoc(docRef)
      .then(() => {
        alert(`${item.pokemon_name} has been deleted successfully.`);
        setLoading(false);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <LoadingScreen></LoadingScreen>}
      <Row justify={"center"} className={style["pokemon-favourite"]}>
        <Col sm={24} lg={24} md={24} xs={24} style={{ marginBottom: 20 }}>
          <Row>
            <Col sm={3} xs={3} md={3}>
              <Button href="/" icon={<LeftCircleOutlined />} type={"text"} />
            </Col>
            <Col sm={21} xs={21} md={21}>
              <div className={style["title"]}> Favourite List</div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} lg={24} md={24} xs={24}>
          {favourites
            ? favourites.map((item, index) => (
                <CardPokemon style={{ padding: "-12px 0" }}>
                  <Row key={index}>
                    <Col sm={10} xs={10} md={10} style={{ textAlign: "left" }}>
                      <img
                        alt="example"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.pokemon_id}.png`}
                        width={100}
                      />
                    </Col>
                    <Col sm={14} xs={14} md={14}>
                      <h3 style={{ textAlign: "left" }}>{item.pokemon_name}</h3>
                      <p style={{ textAlign: "left", fontSize: 10 }}>
                        {item.desc}
                      </p>
                      <p style={{ textAlign: "right" }}>
                        <FavouriteBtn
                          isLoved={true}
                          onClick={() => deleteFavourite(item)}
                        />
                        <ReadMoreBtn id={item.pokemon_id} />
                      </p>
                    </Col>
                  </Row>
                </CardPokemon>
              ))
            : ""}
        </Col>
      </Row>
    </>
  );
}
