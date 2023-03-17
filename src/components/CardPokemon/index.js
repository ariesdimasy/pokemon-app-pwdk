import React from 'react'

import { Card } from "antd";

import style from "./index.module.css";

const CardPokemon = (props) => {
  return (
    <Card className={style["card-pokemon"]} style={props.style}>
      {props.children}
    </Card>
  );
};

export default CardPokemon;
