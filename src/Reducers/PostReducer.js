const initialState = {
  posts: [],
  categories: [],
  subcategories: [],
  current_category: [],
  current_post: [],
  current_post_replies: [],
  replies: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.posts,
        categories: action.categories,
        subcategories: action.subcategories,
      };
    case "CURRENT_CATEGORY":
      return {
        ...state,
        current_category: action.category,
      };
    case "CURRENT_POST":
      return {
        ...state,
        current_post: action.post,
        current_post_replies: action.current_post_replies,
      };
    case "REPLY":
      return {
        ...state,
        current_post_replies: [action.reply, ...state.current_post_replies],
      };
    case "GETREPLIES":
      return {
        ...state,
        replies: action.replies,
      };
    default:
      return state;
  }
};
export default postReducer;
