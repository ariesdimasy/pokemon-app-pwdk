import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { HeartOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { getAllPokemon, getPokemonSpesiesDetail } from "./../../api/pokemonApi";

import style from "./index.module.css";

import CardPokemon from "../../components/CardPokemon";
import HightlightPokemon from "../../components/HighlightPokemon";

import { collection, addDoc } from "firebase/firestore";
import firestore from "./../../firebase/config";
import { v4 as uuidv4 } from "uuid";
import LoadingScreen from "../../components/LoadingScreen";

export default function Home() {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    if (page === 1) {
      getAllPokemons();
    } else {
      getMorePokemons();
    }
  }, [page]);

  const getMorePokemons = () => {
    var finalResults;
    getAllPokemon({
      offset: limit * (page - 1),
      limit: limit,
    }).then((res) => {
      finalResults = res.data.results.map((item, index) => {
        const id = limit * (page - 1) + index + 1;

        return {
          ...item,
          id: id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
          description: "",
        };
      });

      setPokemons((prevState) => {
        return prevState.concat(finalResults);
      });
    });
  };

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

  const addFavouritePokemon = async (pokemon) => {
    setLoading(true);
    const ref = collection(firestore, "pokemons");
    const spesiesDetail = await getPokemonSpesiesDetail(pokemon.id);
    let data = {
      id: pokemon.id,
      uuid: uuidv4(),
      pokemon_id: pokemon.id,
      pokemon_name: pokemon.name,
      desc: spesiesDetail.data.flavor_text_entries[0]["flavor_text"],
    };

    try {
      addDoc(ref, data)
        .then((res) => {
          alert("success added favourite pokemon");
          setLoading(false);
          navigate("/favourite");
        })
        .catch((err2) => {
          alert(JSON.stringify(err2));
        });
    } catch (err) {
      console.log(err);
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      {loading && <LoadingScreen></LoadingScreen>}
      <div className={style.home}>
        <HightlightPokemon addFavouritePokemon={addFavouritePokemon} />

        <h3 className={style["pokemon-list-title"]}>Pokemon List</h3>

        <Row justify={"center"} className={style["pokemon-list"]}>
          {pokemons.map((item) => (
            <Col sm={12} lg={4} xl={4} md={6} xs={12}>
              <CardPokemon>
                <img alt="example" src={item.imageUrl} width={77} height={77} />
                <div>{item.name}</div>
                <div className={style["buttons"]}>
                  <Button
                    href="#"
                    block
                    className={style["fav-btn"]}
                    size="small"
                    icon={<HeartOutlined />}
                    onClick={() => {
                      addFavouritePokemon(item);
                    }}
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
        <Row style={{ paddingBottom: 100 }}>
          <Col sm={12} lg={12} xs={12}>
            <Button
              size="small"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load more ...{" "}
            </Button>
          </Col>
          <Col sm={12} lg={12} xs={12}>
            <Button
              size="small"
              onClick={() => {
                setPage(1);
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
