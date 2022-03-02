import AppContainer from '@nav/AppContainer';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { RootStore, RootStoreProvider, setupRootStore } from './src/models';
import { ErrorBoundary, FallbackProps, } from 'react-error-boundary'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Temporal solution until an update fixes it
LogBox.ignoreLogs([ "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!", ]);

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useEffect(() => {
    const hide = setTimeout(() => {
      SplashScreen.hide();
    }, 1);

    (async () => {
      setupRootStore().then(setRootStore)
    })()

    return () => clearTimeout(hide);
  }, []);

  if (!rootStore) return null

  return <SafeAreaProvider> 
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <RootStoreProvider value={rootStore}>
        <AppContainer />
      </RootStoreProvider>
    </ErrorBoundary>
  </SafeAreaProvider>
};

export default App;
