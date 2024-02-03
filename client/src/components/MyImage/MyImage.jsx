import React from "react";
import { useState } from "react";
import { Puff } from "react-loader-spinner";

export default function MyImage({ src, width, size }) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className="h-[100%]"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width ? width : "100%",
      }}
    >
      <img
        src={src}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          animation: "fadeIn 0.5s",
        }}
        onLoad={(e) => {
          setLoading(false);
        }}
      ></img>
      <div
        className="flex justify-center align-items-center"
        style={{
          display: loading ? "block" : "none",
          fontSize: size ? size : "24px",
        }}
      >
        <Puff
          visible={true}
          height="40"
          width="40"
          color="#ffffffd1"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperclassName=""
        />
      </div>
    </div>
  );
}
