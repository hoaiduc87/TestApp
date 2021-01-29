import produce from 'immer';

import {
  GET_RANDOMID_REQUEST,
  GET_RANDOMID_SUCCESS,
  GET_RANDOMID_FAILURE,
  SET_NOTIFY_MODAL,
} from './constants';

export const initialState = {
  randomId: {
    data: '',
    loading: false,
    error: null,
  },
  notifyModal: null,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RANDOMID_REQUEST:
        draft.randomId.data = '';
        draft.randomId.loading = true;
        draft.randomId.error = null;
        break;

      case GET_RANDOMID_SUCCESS:
        draft.randomId.data = (action.data || {}).random_id;
        draft.randomId.loading = false;
        break;

      case GET_RANDOMID_FAILURE:
        draft.randomId.error = action.error;
        draft.randomId.loading = false;
        break;

      case SET_NOTIFY_MODAL:
        draft.notifyModal = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
