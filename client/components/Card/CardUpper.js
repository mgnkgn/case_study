import React, { useContext } from "react";
import { MainContext } from "@/context/main-context";

const CardUpper = (props) => {
  const { setId, selectedId } = useContext(MainContext);
  return (
    <div
      className={
        props.upper && selectedId == props.id
          ? "card-upper card-upper-2 card-upper-selected"
          : "card-upper"
      }
      onClick={() => {
        console.log(props.id);
        setId(props.id);
      }}
    >
      <p>{props.title}</p>
    </div>
  );
};

export default CardUpper;
