import { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  getDetailPokemon,
  getPokemonSpesiesDetail,
} from "./../../api/pokemonApi";
import { useParams } from "react-router-dom";

import CardPokemon from "../../components/CardPokemon";
import FavouriteBtn from "../../components/FavouriteBtn";

import style from "./index.module.css";

const PokemonDetail = (props) => {
  const [pokemonDetail, setPokemonDetail] = useState({
    desc: "",
  });
  const { id } = useParams();

  const getPokemonDetail = () => {
    getDetailPokemon(id)
      .then((res) => {
        setPokemonDetail(res.data);
        return getPokemonSpesiesDetail(id);
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
      <Row justify={"center"} className={style["pokemon-hightlight"]}>
        <Col sm={24} lg={24} md={24} xs={24} style={{ marginBottom: 20 }}>
          <Row>
            <Col sm={3} xs={3} md={3}>
              <Button href="/" icon={<LeftCircleOutlined />} type={"text"} />
            </Col>
            <Col sm={21} xs={21} md={21}>
              <div className={style["title"]}>{pokemonDetail.name}</div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} lg={24} md={24} xs={24}>
          <CardPokemon style={{ padding: "-12px 0" }}>
            <Row>
              <Col sm={11} xs={11} md={11} style={{ textAlign: "left" }}>
                <img
                  alt="example"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonDetail.id}.png`}
                  width={100}
                />
              </Col>
              <Col sm={13} xs={13} md={13}>
                <h3 style={{ textAlign: "left" }}> {pokemonDetail.name} </h3>
                <p style={{ textAlign: "left", fontSize: 10 }}>
                  {pokemonDetail["desc"]}
                </p>
                <p style={{ textAlign: "right" }}>
                  <FavouriteBtn />
                </p>
              </Col>
            </Row>
          </CardPokemon>
        </Col>
        <Col sm={24} xs={24}>
          <h3 style={{ textAlign: "left" }} className={style["title"]}>
            {" "}
            Ability{" "}
          </h3>
          <hr />
          <div style={{ marginTop: 30 }}>
            {pokemonDetail?.stats?.map((item) => (
              <Row>
                <Col sm={6} xs={6} md={6}>
                  <div className={style["list-info"]}>{item.stat.name}</div>
                </Col>
                <Col sm={18} xs={18} md={18}>
                  <div className={style["bar"]}>
                    <div
                      className={style["bar-fill"]}
                      style={{ width: `${item.base_stat}%` }}
                    ></div>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PokemonDetail;
