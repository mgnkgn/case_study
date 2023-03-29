import React, { useContext } from "react";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { MainContext } from "@/context/main-context";

const TurnBtn = () => {
  const { horizontal, setHorizontal } = useContext(MainContext);

  const horizonHandler = () => {
    console.log(horizontal);
    setHorizontal(!horizontal);
  };
  return (
    <div className="rotate-icon mt-5">
      <RotateRightIcon fontSize="large" onClick={horizonHandler} />
    </div>
  );
};

export default TurnBtn;
