const initialState = {
  users: [],
  signed_in: false,
  current_user: {},
  clicked_user: {},
  token: "",
  my_team: {},
  my_players: [],
  recently_online: [],
  following: [],
  followers: [],
  Ifollow: [],
  likedposts: [],
  likedpostids: [],
  myPosts: [],
  sent_messages: [],
  received_messages: [],
  notifications: [],
  profile_picture: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SIGN_IN":
      return {
        ...state,
        current_user: action.current_user,
        signed_in: true,
        token: action.token,
        my_team: action.user_team,
        my_players: action.players,
        following: action.following,
        Ifollow: action.Ifollow,
        followers: action.followers,
        likedposts: action.likedposts,
        likedpostids: action.likedpostids,
        myPosts: action.posts,
        sent_messages: action.sent_messages,
        received_messages: action.received_messages,
        activity: [],
        profile_picture: action.profile_picture,
      };
    case "SIGN_OUT":
      return {
        initialState,
      };
    case "CREATE_USER":
      return {
        ...state,
        current_user: action.user,
      };
    case "EDIT_USER":
      return {
        ...state,
        current_user: action.user,
      };
    case "GET_USER":
      return {
        ...state,
        current_user: action.current_user,
        signed_in: false,
      };
    case "DELETE":
      return {
        initialState,
      };
    case "ADDPLAYERTOTEAM":
      return {
        ...state,
        my_players: action.my_players,
      };
    case "REMOVEPLAYERFROMTEAM":
      return {
        ...state,
        my_players: action.my_players,
      };
    case "CLICKED":
      return {
        ...state,
        clicked_user: action.user,
      };
    case "RECENTONLINE":
      return {
        ...state,
        recently_online: action.users,
      };
    case "FOLLOW":
      return {
        ...state,
        following: [action.follow, ...state.following],
      };
    case "UNFOLLOW":
      return {
        ...state,
        following: state.following.filter((follow) => follow !== action.follow),
      };
    case "UNLIKE":
      return {
        ...state,
        likedpostids: state.likedpostids.filter((like) => like !== action.like),
      };
    case "LIKE":
      return {
        ...state,
        likedpostids: [action.like, ...state.likedpostids],
      };
    case "SENDMESSAGE":
      return {
        ...state,
        sent_messages: [action.message, ...state.sent_messages],
      };
    case "NOTIFICATIONS":
      return {
        ...state,
        notifications: action.notifications,
      };
    case "ACTIVITY":
      return {
        ...state,
        activity: action.activity,
      };
    default:
      return state;
  }
};
export default userReducer;
