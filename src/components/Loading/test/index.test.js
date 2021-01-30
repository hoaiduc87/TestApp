import React from 'react';
import { render } from '@testing-library/react';

import Loading from '..';

describe('<Loading/>', () => {
  it('Should run and match snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Loading />);
    expect(firstChild).toMatchSnapshot();
  });
})