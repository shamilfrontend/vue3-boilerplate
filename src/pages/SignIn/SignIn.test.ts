import { describe, it, expect } from 'vitest';

import { shallowMount } from '#/tests/unit';

import Component from './index';

describe('SignIn', () => {
  it('element should match snapshot', async () => {
    const { element } = await shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
