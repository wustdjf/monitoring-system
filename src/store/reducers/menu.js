// 引入action_type
import { SET_MENU } from '@/store/action_types';

// 初始化
const initState = {
  collapsed: false
};

export default function menuReducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MENU: {
      return Object.assign(state, {
        collapsed: payload
      });
    }
    default:
      return state;
  }
}
