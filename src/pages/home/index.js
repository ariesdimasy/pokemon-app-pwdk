import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { HeartOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { getAllPokemon } from "./../../api/pokemonApi";

import style from "./index.module.css";

import CardPokemon from "../../components/CardPokemon";
import HightlightPokemon from "../../components/HighlightPokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = () => {
    var finalResults;
    setOffset(limit * (page - 1));
    setPokemons([]);
    getAllPokemon({
      offset: limit * (page - 1),
      limit: limit,
    })
      .then((res) => {
        finalResults = res.data.results.map((item, index) => {
          const id = limit * (page - 1) + index + 1;

          return {
            ...item,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
            description: "",
          };
        });

        setPokemons(finalResults);
        setTotalData(res.data.count);
      })

      .catch((err) => [console.log(err)]);
  };

  return (
    <div className={style.home}>
      <HightlightPokemon />

      <h3 className={style["pokemon-list-title"]}>Pokemon List</h3>
      <Row justify={"center"} className={style["pokemon-list"]}>
        {pokemons.map((item) => (
          <Col sm={12} lg={3} md={3} xs={12}>
            <CardPokemon>
              <img alt="example" src={item.imageUrl} width={77} height={77} />
              <div>{item.name}</div>
              <div className={style["buttons"]}>
                <Button
                  href="/favourite"
                  block
                  className={style["fav-btn"]}
                  size="small"
                  icon={<HeartOutlined />}
                ></Button>
                <Button
                  href={`/detail/${item.id}`}
                  block
                  className={style["info-btn"]}
                  size="small"
                  icon={<InfoCircleOutlined />}
                ></Button>
              </div>
            </CardPokemon>
          </Col>
        ))}
      </Row>
    </div>
  );
}
