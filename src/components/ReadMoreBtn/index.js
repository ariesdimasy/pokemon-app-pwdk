import React from 'react'
import { Button } from "antd";

export default function ReadMoreBtn(props) {
  return (
    <>
      <Button
        size="small"
        href={`/detail/${props.id}`}
        style={{
          backgroundColor: "#FF7A2E",
          border: "none",
          color: "white",
        }}
      >
        {" "}
        Read More ...{" "}
      </Button>
    </>
  );
}
