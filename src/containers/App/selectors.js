import { createSelector } from 'reselect';
import { initialState } from './reducer';

const appState = state => state.app || initialState;

const selectRandomId = () =>
  createSelector(
    appState,
    substate => substate.randomId.data
  );

const selectNotifyModal = () =>
  createSelector(
    appState,
    substate => substate.notifyModal
  );

export {
  selectRandomId,
  selectNotifyModal,
};
