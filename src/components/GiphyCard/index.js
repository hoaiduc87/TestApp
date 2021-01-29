import React, { memo } from 'react';
import PropTypes from 'prop-types';

import AttachmentIcon from 'assets/images/attachment.svg';
import ChatBubbleIcon from 'assets/images/chat_bubble.svg';
import EyeIcon from 'assets/images/eye.svg';
import HeartIcon from 'assets/images/heart.svg';

import './style.scss';

function GiphyCard({
  data,
  onClickImage,
}) {
  const { images, user, analytics } = data;
  const originalImage = (images || {}).original || {};
  const { load, sent, click } = analytics || {};

  return (
    <div className="giphy-item">
      <div className="giphy-card">
        <div className="giphy-card__image" onClick={() => onClickImage(originalImage.url)}>
          <img src={originalImage.url} alt="thumb" />
        </div>
        <div className="giphy-card__footer">
          <div className="giphy-card__footer--left">
            <img className="analytics-attachment-icon" src={AttachmentIcon} alt="" />
          </div>
          <div className="giphy-card__footer--right">
            <span className="analytics-item">
              <img src={EyeIcon} alt="" />
              <span>{load || 0}</span>
            </span>
            <span className="analytics-item">
              <img src={ChatBubbleIcon} alt=""/>
              <span>{sent || 0}</span>
            </span>
            <span className="analytics-item">
              <img src={HeartIcon} alt=""/>
              <span>{click || 0}</span>
            </span>
          </div>
        </div>
      </div>
      {!!user &&
        <div className="giphy-author">
          <img className="giphy-author__image" src={user.avatar_url} alt="user" />
          <strong className="giphy-author__name">{user.display_name || user.username || ''}</strong>
        </div>
      }
    </div>
  )
}

GiphyCard.propTypes = {
  data: PropTypes.object,
  onClickImage: PropTypes.func,
};

export default memo(GiphyCard);
