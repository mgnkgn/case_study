export default (state = initialState, action) => {
  switch (action.type) {
    case "SEND_POST":
      // creating newPost here so it becomes more readable
      const newPost = {
        // id: action.payload.id, ID sets in the server now
        title: action.payload.title,
        description: action.payload.description,
        createDate: action.payload.createDate,
        imgUrl: action.payload.imgUrl,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case "SET_ID":
      return {
        ...state,
        selectedId: action.payload,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: [...(action.payload ?? state.initialState)],
      };
    case "SET_HORIZONTAL":
      return {
        ...state,
        horizontal: action.payload,
      };
    default:
      return state;
  }
};
