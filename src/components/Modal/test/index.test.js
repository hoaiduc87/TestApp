import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import Modal from '..';

const props = {
  show: false,
  className: 'test',
};

describe('<Modal/>', () => {
  it('Should run and match snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Modal {...props} />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should execute onClose once click close button', () => {
    const onClose = jest.fn();
    const comp = mount(
      <Modal {...props} onClose={onClose}>
        <span>test</span>
      </Modal>
    );
    comp.setProps({ show: true });
    comp.find('.modal__dialog__close').first().simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
})