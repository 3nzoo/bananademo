import { BANNER_SELECTED } from "./types";

export const selectBanner = banner => {
  return {
    type: BANNER_SELECTED,
    payload: banner
  };
};
