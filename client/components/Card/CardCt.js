import React from "react";
import CardInfo from "./CardInfo";
import CardMain from "./CardMain";

import CardUpperCt from "./CardUpperCt";

const CardCt = (props) => {
  return (
    <div className="card-ct">
      <CardUpperCt upper={props.upper} />
      {props.upper ? <CardInfo /> : <CardMain />}
    </div>
  );
};

export default CardCt;
