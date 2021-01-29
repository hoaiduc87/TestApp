import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from 'assets/images/loading.gif';

import './style.scss';

function Loading({
  loading,
  className,
  width,
}) {
  return (
    <div className={`loading ${className || ''} ${!loading ? 'hidden' : ''}`}>
      <img src={LoadingIcon} alt="loading" width={width || '100px'} />
    </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.any,
};

export default memo(Loading);
