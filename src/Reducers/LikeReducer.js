const initialState = {
    likes: []
}

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETLIKES":
      return {
        likes: action.likes,
      };

    default:
      return state;
  }
};
export default likeReducer;
