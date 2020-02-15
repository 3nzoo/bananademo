import { BANNER_SELECTED } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case BANNER_SELECTED:
      return action.payload;
  }
  return state;
}
