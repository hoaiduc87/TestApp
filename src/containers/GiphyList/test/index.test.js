import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import GiphyList from '..';

const mockStore = configureMockStore();
const initialState = {
  giphyList: {
    trendingGif: {
      analytics: {},
      data: {
        data: [
          {

          }
        ],
        pagination: {
          total_count: 100,
          offset: 0,
          count: 1
        }
      },
      initloading: false,
      updateLoading: false,
      error: null,
    }
  }
};
const store = mockStore(initialState);

describe('<GiphyList/>', () => {
  it('Should run and match snapshot', () => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>;
    const {
      container: { firstChild }
    } = render(<GiphyList />, { wrapper: Wrapper });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should execute setNotifyModalRequest once click close button', () => {
    store.dispatch = jest.fn();
    const comp = mount(
      <Provider store={store}>
        <GiphyList />
      </Provider>
    );
    comp.find('.default-btn--primary').first().simulate('click');
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
})