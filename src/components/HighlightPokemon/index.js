import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
  getDetailPokemon,
  getPokemonSpesiesDetail,
} from "./../../api/pokemonApi";

import CardPokemon from "../CardPokemon";
import FavouriteBtn from "../../components/FavouriteBtn";
import ReadMoreBtn from "../../components/ReadMoreBtn";

import style from "./index.module.css";

export default function HightlightPokemon() {
  const [randPokemon, _] = useState(Math.floor((Math.random() + 1) * 50));
  const [pokemonDetail, setPokemonDetail] = useState({});

  const getPokemonDetail = () => {
    getDetailPokemon(randPokemon)
      .then((res) => {
        setPokemonDetail(res.data);
        return getPokemonSpesiesDetail(randPokemon);
      })
      .then((res) => {
        setPokemonDetail((prevState) => ({
          ...prevState,
          desc: res.data.flavor_text_entries[0]["flavor_text"],
        }));
      });
  };

  useEffect(() => {
    getPokemonDetail();
  }, []);

  return (
    <>
      <h3 className={style["highlight-title"]}>Hightlight</h3>
      <Row justify={"center"} className={style["pokemon-hightlight"]}>
        <Col sm={24} lg={24} md={24} xs={24}>
          <CardPokemon style={{ padding: "-12px 0" }}>
            <Row>
              <Col sm={10} xs={10} md={10} style={{ textAlign: "left" }}>
                <img
                  alt="example"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${randPokemon}.png`}
                  width={90}
                />
              </Col>
              <Col sm={14} xs={14} md={14}>
                <h3 style={{ textAlign: "left" }}> {pokemonDetail.name} </h3>
                <p style={{ textAlign: "left", fontSize: 10 }}>
                  {pokemonDetail["desc"]}
                </p>
                <p style={{ textAlign: "right" }}>
                  <FavouriteBtn />
                  <ReadMoreBtn id={randPokemon} />
                </p>
              </Col>
            </Row>
          </CardPokemon>
        </Col>
      </Row>
    </>
  );
}
