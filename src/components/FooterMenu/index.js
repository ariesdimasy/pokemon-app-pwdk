import React from "react";
import { Button, Col, Row } from "antd";

import style from "./index.module.css";

export default function FooterMenu() {
  return (
    <div className={style["footer-menu"]}>
      <Row justify={"center"}>
        <Col sm={12} xs={12} md={12}>
          <Button
            size="small"
            icon={<img src="/Pokeball.png" height={20} />}
            href="/"
            style={{ backgroundColor: "transparent", border: "none" }}
          ></Button>
          <div>Pokemons</div>
        </Col>
        <Col sm={12} xs={12} md={12}>
          <Button
            size="small"
            icon={<img src="/Bookmark.png" height={20} />}
            href="/favourite"
            style={{ backgroundColor: "transparent", border: "none" }}
          ></Button>
          <div>Favourite</div>
        </Col>
      </Row>
    </div>
  );
}
