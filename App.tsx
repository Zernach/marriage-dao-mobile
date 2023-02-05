// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";
// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";
// Step 3: Import the thirdweb SDK
import './src/constants/global'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { LogBox, Platform } from "react-native";
import { AppProvider } from './src/context/AppProvider';
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { Provider } from 'react-redux';
import { store } from './src/context/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
LogBox.ignoreAllLogs();

// AppProvider: Provides a Global Wallet Address
// Provider: Uses redux-toolkit with redux-persist for data that should be persisted from local async storage
// WalletConnect Provider: If the users uses walletconnect we can access their wallet from a slightly lower level

export default function App() {
  const isLoadingComplete = useCachedResources();
  let persistor = persistStore(store);
  const walletConnectRedirectUrl = Platform.OS === "web" ? window.location.origin : `marriagedao://`

  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WalletConnectProvider
            redirectUrl={walletConnectRedirectUrl}
            storageOptions={{ asyncStorage: AsyncStorage }}
          >
            {isLoadingComplete
              &&
              <SafeAreaProvider>
                <Navigation colorScheme={'dark'} />
                <StatusBar />
              </SafeAreaProvider>
            }
          </WalletConnectProvider>
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}