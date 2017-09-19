import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root';

describe('<Root />', () => {
  it('should have a div contains \'Hello World\'', () => {
    const wrapper = shallow(<Root />);
    const actual = wrapper.find('div').text();
    const expected = 'Hello World';

    expect(actual).toEqual(expected);
  });
});
