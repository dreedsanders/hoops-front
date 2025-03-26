const initialState = {
  games: [],
};

const nbaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETGAMES":
      return {
        games: action.games,
      };

    default:
      return state;
  }
};
export default nbaReducer;
