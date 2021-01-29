/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import GiphyCard from 'components/GiphyCard';
import Modal from 'components/Modal';
import Loading from 'components/Loading';

import { selectRandomId } from 'containers/App/selectors';

import { getGifsTrendingRequest } from './actions';
import {
  selectGifsTrendingData,
  selectGifsTrendingInitLoading,
  selectGifsTrendingUpdateLoading,
  selectGifsTrendingError,
} from './selectors';

import './style.scss';

const ITEMS_PER_PAGE = 20;

function GiphyList({
  randomId,
  gifsTrending,
  initLoading,
  updateLoading,
  error,
  getGifsTrending,
}) {
  let resizeTimeout = null;
  let scrollTimeout = null;
  let isLoadingMore = false;
  const gifs = gifsTrending.data || [];
  const pagination = gifsTrending.pagination || {};
  const canLoadMore = pagination.total_count > pagination.offset + pagination.count;

  const [isScrollable, setIsScrollable] = useState(false);
  const [modal, setModal] = useState({});

  useEffect(() => {
    getGifsTrending({
      random_id: randomId,
      rating: 'g',
      limit: ITEMS_PER_PAGE,
    });
  }, []);

  useEffect(() => {
    handleResize();
  }, [gifs.length]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, [isScrollable, gifs.length, canLoadMore, error]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isScrollable]);

  const handleScroll = () => {
    if (!isScrollable || !canLoadMore || isLoadingMore || error) {
      return;
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const scrollRemain = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight;

      if (scrollRemain < document.documentElement.clientHeight) {
        isLoadingMore = true;
        getGifsTrending({
          random_id: randomId,
          rating: 'g',
          limit: ITEMS_PER_PAGE,
          offset: pagination.offset + pagination.count,
          isUpdate: true,
        });
      }
    }, 100);
  };

  const handleLoadMore = () => {
    getGifsTrending({
      random_id: randomId,
      rating: 'g',
      limit: ITEMS_PER_PAGE,
      offset: pagination.offset + pagination.count,
      isUpdate: true,
    });
  };

  const handleResize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      const tmpOffset = document.documentElement.offsetHeight - document.documentElement.clientHeight;

      if (!isScrollable && document.documentElement.clientHeight < tmpOffset) {
        setIsScrollable(true);
      }

      if (isScrollable && document.documentElement.clientHeight >= tmpOffset) {
        setIsScrollable(false);
      }
    }, 100);
  };

  return (
    <div className="giphy-trending__container">
      <Modal
        show={!!modal.imageSrc}
        className="modal--fullscreen"
        onClose={() => setModal({})}
      >
        <img className="giphy-trending__modal__body" src={modal.imageSrc} alt="fullscreen" />
      </Modal>
      <Loading loading={initLoading} />
      <div className="giphy-trending__list">
        {gifs.map((gifItem, idx) =>
          <GiphyCard
            key={`${gifItem.id}-${idx}`}
            data={gifItem || {}}
            onClickImage={(imageSrc) => setModal({ imageSrc })}
          />
        )}
      </div>
      <div className="giphy-trending__footer">
        <Loading loading={updateLoading} className="loading--transparent" width="60px" />
        {(!isScrollable || error) && canLoadMore && !updateLoading &&
          <button
            type="button"
            className="default-btn default-btn--primary default-btn--round"
            onClick={handleLoadMore}
          >See more gifs</button>
        }
      </div>
    </div>
  )
}

GiphyList.propTypes = {
  randomId: PropTypes.string,
  gifsTrending: PropTypes.object,
  initLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  error: PropTypes.any,
  getGifsTrending: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  randomId: selectRandomId(),
  gifsTrending: selectGifsTrendingData(),
  initLoading: selectGifsTrendingInitLoading(),
  updateLoading: selectGifsTrendingUpdateLoading(),
  error: selectGifsTrendingError(),
});

const mapDispatchToProps = (dispatch) => ({
  getGifsTrending: params => dispatch(getGifsTrendingRequest(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(GiphyList);
