import React from "react";

import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export default function FavouriteBtn(props) {
  return (
    <>
      <Button
        icon={props.isLoved ? <HeartFilled /> : <HeartOutlined />}
        style={{
          backgroundColor: "#0E1F40",
          color: "white",
          borderColor: "#0E1F40",
          marginRight: 10,
        }}
        href={props.href}
        onClick={props.onClick}
      ></Button>
    </>
  );
}
