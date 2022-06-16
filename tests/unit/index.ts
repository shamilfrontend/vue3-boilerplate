import Qui from '@qvant/qui-max';
import { shallowMount as shallowMountOriginal } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import type { GlobalMountOptions } from '@vue/test-utils/dist/types';
import { setActivePinia } from 'pinia';
import type { ComponentPublicInstance } from 'vue';

import QContainer from '@/components/QContainer';
import QPageWrap from '@/components/QPageWrap';
import { router } from '@/router';
import { store } from '@/store';

interface Config extends GlobalMountOptions {
  props?: { [key: string]: unknown };
}

const shallowMount = async <C>(
  component: C,
  config: Config = {}
): Promise<VueWrapper<ComponentPublicInstance>> => {
  const { props, stubs, plugins, components, ...restCfg } = config;

  setActivePinia(store);

  router.push('/');
  await router.isReady();

  return shallowMountOriginal(component, {
    props,
    global: {
      stubs: {
        ...(stubs ?? {})
      },
      components: {
        QPageWrap,
        QContainer,
        ...(components ?? {})
      },
      plugins: [Qui, router, store, ...(plugins ?? [])],
      ...restCfg
    }
  });
};

export { shallowMount };
