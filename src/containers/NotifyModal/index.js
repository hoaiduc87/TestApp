import React, { memo } from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { setNotifyModal } from 'containers/App/actions';
import { selectNotifyModal } from 'containers/App/selectors';

import './style.scss';

function NotifyModal({
  notifyModal,
  setNotifyModalRequest,
}) {
  const handleClose = () => {
    setNotifyModalRequest(null);
  };

  const type = notifyModal && notifyModal.type;

  return (
    <Modal show={!!notifyModal} className={`modal--small modal--${type}`} onClose={handleClose}>
      {!!notifyModal &&
        <>
          <div className={`modal--${type}__header`}>{notifyModal.title}</div>
          <div className={`modal--${type}__body`}>{notifyModal.message}</div>
        </>
      }
    </Modal>
  )
}

const mapStateToProps = createStructuredSelector({
  notifyModal: selectNotifyModal(),
});

const mapDispatchToProps = (dispatch) => ({
  setNotifyModalRequest: data => dispatch(setNotifyModal(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(NotifyModal);
