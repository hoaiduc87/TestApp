/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import GiphyList from 'containers/GiphyList';
import NotifyModal from 'containers/NotifyModal';

import { getRandomIdRequest } from './actions';
import { selectRandomId } from './selectors';

import 'assets/styles/commons.scss';

function App({ randomId, getRandomId }) {
  useEffect(() => {
    getRandomId();
  }, []);

  return (
    <div className="app-container">
      <NotifyModal />
      {!!randomId && <GiphyList />}
    </div>
  );
}

App.propTypes = {
  randomId: PropTypes.string,
  getRandomId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  randomId: selectRandomId()
});

const mapDispatchToProps = (dispatch) => ({
  getRandomId: () => dispatch(getRandomIdRequest({})),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(App);
