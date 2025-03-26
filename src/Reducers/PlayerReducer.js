const initialState = {
  players: [],
  currentPlayer: {},
  currentPlayerTeam: {},
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYERS":
      return {
        ...state,
        players: action.players,
      };
    case "PLAYER_CLICK":
      return {
        ...state,
        currentPlayer: action.currentPlayer,
        currentPlayerTeam: action.currentPlayerTeam,
      };
    case "CLEAR":
      return {
        ...state,
        currentPlayer: {},
        currentPlayerTeam: {},
      };
    case "UPDATE_PLAYERS":
      return state.players.map((p) => {
        if (p.id == action.player.id) {
          return action.player;
        } else {
          return p;
        }
      });
    default:
      return state;
  }
};
export default playerReducer;
