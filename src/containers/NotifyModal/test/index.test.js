import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import NotifyModal from '..';

const mockStore = configureMockStore();
const initialState = {
  app: {
    notifyModal: {
      type: 'error',
      title: 'Error',
      message: 'Error occur'
    },
  }
};
const store = mockStore(initialState);

describe('<NotifyModal/>', () => {
  it('Should run and match snapshot', () => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>;
    const {
      container: { firstChild }
    } = render(<NotifyModal />, { wrapper: Wrapper });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should execute setNotifyModalRequest once click close button', () => {
    store.dispatch = jest.fn();
    const comp = mount(
      <Provider store={store}>
        <NotifyModal />
      </Provider>
    );
    comp.find('.modal__dialog__close').first().simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
  });
})