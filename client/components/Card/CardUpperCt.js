import { MainContext } from "@/context/main-context";
import React, { useContext } from "react";
import CardUpper from "./CardUpper";

const CardUpperCt = (props) => {
  const { posts } = useContext(MainContext);

  const uppers = posts.map((post, i) => (
    <CardUpper
      title={post.title}
      key={i + post.title}
      id={post.id}
      upper={props.upper}
    />
  ));

  return props.upper ? (
    <div className="card-upper-ct-props">{uppers}</div>
  ) : (
    <div className="card-upper-ct">
      <CardUpper
        title={"New Title"}
        key={0 + "_def"}
        id="007"
        upper={props.upper}
      />
    </div>
  );
};

export default CardUpperCt;
