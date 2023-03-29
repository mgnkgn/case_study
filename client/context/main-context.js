import React, { createContext, useReducer } from "react";
import MainReducer from "./MainReducer";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Stewie Griffin",
      description:
        "He is the youngest child of Lois and Peter Griffin. He has two older siblings, Meg and Chris. They are an American family, although Stewie is the only one in his family with a British accent. Seth MacFarlane, is the man responsible for voicing (imitating) and creating the voice for Stewie Griffin. Seth said in an interview that Stewie's voice was inspired by that of Rex Harrison's voice. ",
      createdate: "01/01/2022",
      imgurl:
        "https://firebasestorage.googleapis.com/v0/b/case-study-dffde.appspot.com/o/images%2Fstewie-griffin.jpg6de1011f-066c-45a3-b3da-9c80003253b5?alt=media&token=f2ce67a4-ce99-4156-8d29-7ad31da34836",
    },
    {
      id: 2,
      title: "Peter Griffin",
      description:
        "Peter Löwenbräu Griffin, Sr., born Justin Peter Griffin according to his birth records in Quagmire's Mom, is a man of Irish descent currently residing in Quahog, Rhode Island with his wife Lois Griffin. ",
      createdate: "01/02/2022",
      imgurl:
        "https://firebasestorage.googleapis.com/v0/b/case-study-dffde.appspot.com/o/images%2Fpeter-griffin-i.webp46cd5574-f162-4533-95db-a1452c7f7bcd?alt=media&token=52e8ff76-420e-4948-a65f-ba3e34cf40ee",
    },
  ],
  selectedId: null,
  horizontal: false,
};

export const MainContext = createContext(initialState);

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState);

  const sendPost = (post) => {
    dispatch({
      type: "SEND_POST",
      payload: post,
    });
  };

  const setId = (id) => {
    dispatch({
      type: "SET_ID",
      payload: id,
    });
  };

  const setPosts = (posts) => {
    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  };

  const setHorizontal = (val) => {
    dispatch({
      type: "SET_HORIZONTAL",
      payload: val,
    });
  };

  return (
    <MainContext.Provider
      value={{
        posts: state.posts,
        selectedId: state.selectedId,
        sendPost,
        setId,
        setPosts,
        horizontal: state.horizontal,
        setHorizontal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
