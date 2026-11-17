import { vol } from 'memfs';

import { getNativeModuleVersionsAsync } from '../getNativeModuleVersionsAsync';

jest.mock('fs');
jest.mock('resolve-from');

const projectRoot = '/tmp/project';

describe(getNativeModuleVersionsAsync, () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('fetch failed'));
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vol.reset();
  });

  it('reads the local expo/bundledNativeModules.json when the Expo API is unreachable', async () => {
    const bundledNativeModules = { 'expo-modules-core': '~3.0.0' };
    vol.fromJSON({
      [`${projectRoot}/node_modules/expo/bundledNativeModules.json`]:
        JSON.stringify(bundledNativeModules),
    });

    await expect(getNativeModuleVersionsAsync(projectRoot, '58.0.0')).resolves.toEqual(
      bundledNativeModules
    );
  });
});
