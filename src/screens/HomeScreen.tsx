import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RootState } from '../context/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/AppProvider';
import { Ionicons } from '@expo/vector-icons';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { setWallet } from '../context/store/wallet';
import { responsiveHeight, responsiveWidth } from '../theme';

export default function HomeScreen({ navigation }) {
  const wallet = useSelector((state: RootState) => state.wallet.walletAddress);
  const { setCurrentWalletAddress } = useContext(AppContext)
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const logout = () => {
    console.log("Logging out: ", wallet)
    if (connector.connected) {
      connector.killSession();
    }
    setCurrentWalletAddress("")
    dispatch(setWallet(""))
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'white' }}>
              {`Hello ${wallet ? `${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}` : 'No username'}`}
            </Text>
            <TouchableOpacity onPress={() => setIsLogoutModalOpen(true)}>
              {wallet ?
                <ImageBackground
                  source={require('../assets/images/user-profile.jpg')}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
                : null
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLogoutModalOpen ?
        <View style={{ position: 'absolute', top: responsiveHeight(10), right: responsiveHeight(10), backgroundColor: '#1c1c1c', borderRadius: responsiveWidth(5), borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, width: responsiveWidth(30) }}>
          <TouchableOpacity
            onPress={() => { return logout() }}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="exit-outline" size={22} color={'white'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'white'
                }}>
                {'Sign Out'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogoutModalOpen(false)}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="exit-outline" size={22} color={'white'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'white'
                }}>
                {'Cancel'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        null
      }
    </>
  );
}
