import { SET_MENU } from '@/store/action_types';

/**
 * @description 设置菜单打开还是关闭
 * @param {boolean} payload
 * @returns
 */

export const setMenuHandler = (payload) => async (dispatch) => {
  dispatch({
    type: SET_MENU,
    payload
  });
};
