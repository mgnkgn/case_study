import React, { useContext, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CardCt from "./Card/CardCt";
import { MainContext } from "@/context/main-context";

const MainLower = () => {
  const { setId, posts, selectedId, horizontal } = useContext(MainContext);

  const getCurIndex = (id) => {
    const myEl = posts.find((el) => el.id === id);
    return posts.indexOf(myEl);
  };
  const goLeftHandler = () => {
    let myIndex = getCurIndex(selectedId);
    if (selectedId === null) {
      myIndex = 0;
      setId(posts[myIndex].id);
      return;
    }

    if (myIndex === 0) {
      myIndex = posts.length;
      setId(posts[posts.length - 1].id);
      return;
    }
    setId(posts[myIndex - 1]?.id);
  };

  const goRightHandler = () => {
    let myIndex = getCurIndex(selectedId);
    if (myIndex === posts.length - 1) {
      myIndex = 0;
      setId(posts[0].id);
      return;
    }
    setId(posts[myIndex + 1]?.id);
  };

  return (
    <motion.div
      drag={horizontal ? "y" : "x"}
      whileTap={{ cursor: "grabbing" }}
      dragConstraints={{
        top: horizontal ? null : 20,
        bottom: horizontal ? null : 20,
      }}
      dragMomentum={false}
      animate={{ x: horizontal ? 50 : 0, transition: { duration: 0.5 } }}
      className="draggable-ct"
    >
      <div>
        <ArrowBackRoundedIcon
          fontSize="large"
          onClick={goLeftHandler}
          className="arrow-left"
        />
      </div>
      <CardCt upper />
      <div>
        <ArrowForwardRoundedIcon
          fontSize="large"
          onClick={goRightHandler}
          className="arrow-right"
        />
      </div>
    </motion.div>
  );
};

export default MainLower;
