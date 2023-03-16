import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import style from "./index.module.css";

import CardPokemon from "../../components/CardPokemon";
import FavouriteBtn from "../../components/FavouriteBtn";
import ReadMoreBtn from "../../components/ReadMoreBtn";

export default function Favourite() {
  return (
    <>
      <Row justify={"center"} className={style["pokemon-hightlight"]}>
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
          <CardPokemon style={{ padding: "-12px 0" }}>
            <Row>
              <Col sm={11} xs={11} md={11} style={{ textAlign: "left" }}>
                <img
                  alt="example"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png`}
                  width={100}
                />
              </Col>
              <Col sm={13} xs={13} md={13}>
                <h3 style={{ textAlign: "left" }}> Pikachu </h3>
                <p style={{ textAlign: "left", fontSize: 10 }}>
                  The character of Pikachu is often depicted as friendly and
                  cheerful.
                </p>
                <p style={{ textAlign: "right" }}>
                  <FavouriteBtn />
                  <ReadMoreBtn />
                </p>
              </Col>
            </Row>
          </CardPokemon>
        </Col>
      </Row>
    </>
  );
}
