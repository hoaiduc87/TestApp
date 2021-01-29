/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import CloseWhite from 'assets/images/close_white.svg';
import './style.scss';

function Modal({
  show,
  className,
  children,
  onClose,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [show]);

  return (
    <div className={`modal ${show ? 'modal--visible' : 'modal--hidden'}`}>
      <div className={`modal__dialog ${className}`}>
        <span className="modal__dialog__close" onClick={onClose}>
          <img src={CloseWhite} alt="close" />
        </span>
        {children}
      </div>
      <div className="modal__backdrop" onClick={onClose} />
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
}

export default memo(Modal);
