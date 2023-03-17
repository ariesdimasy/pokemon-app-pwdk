import React from 'react'

import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

export default function FavouriteBtn(props) {
  return (
    <>
      <Button
        icon={<HeartOutlined />}
        style={{
          backgroundColor: "#0E1F40",
          color: "white",
          borderColor: "#0E1F40",
          marginRight: 10,
        }}
        href={props.href}
      ></Button>
    </>
  );
}
