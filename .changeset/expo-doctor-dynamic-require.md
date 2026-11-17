---
'expo-doctor': patch
---

Fix the local `expo/bundledNativeModules.json` fallback when the Expo API is unreachable, and the Babel config loader used by the Hermes V1 check. The built CLI could not load either file, so the React Native Directory check flagged SDK-bundled modules, and the Worklets Bundle Mode advice never appeared.
