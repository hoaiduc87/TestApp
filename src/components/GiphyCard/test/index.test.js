import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import GiphyCard from '..';

const props = {
  data: {
    images: {
      original: {
        url: 'test'
      }
    },
    user: {
      avatar_url: '',
      display_name: 'test'
    },
    analytics: {
      load: 100,
      sent: 100,
      click: 100
    }
  }
};

describe('<GiphyCard/>', () => {
  it('Should run and match snapshot', () => {
    const {
      container: { firstChild }
    } = render(<GiphyCard {...props} />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should execute onClickImage once click image', () => {
    const onClickImage = jest.fn();
    const comp = shallow(<GiphyCard {...props} onClickImage={onClickImage} />);
    comp.find('.giphy-card__image').first().simulate('click');
    expect(onClickImage).toBeCalledWith('test');
  })
})