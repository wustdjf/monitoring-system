// 引入action_type
import { SET_ROUTERS } from '@/store/action_types';

// 初始化
const initState = {
  routers: [],
  currentRouter: {}
};

export default function routerReducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROUTERS: {
      return Object.assign(state, {
        routers: payload
      });
    }
    default:
      return state;
  }
}
