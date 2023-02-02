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
import { fonts, nullProfileImageLink, responsiveFontSize, responsiveHeight, responsiveWidth } from '../theme';
import { TabsView } from '../components/@archlife/tabs-view/tabs-view';
import { TextInputter } from '../components/@archlife/text-inputter/text-inputter';
import { Headliner } from '../components/headliner/headliner';

export default function HomeScreen({ navigation }) {
  const wallet = useSelector((state: RootState) => state.wallet.walletAddress);
  const { setCurrentWalletAddress } = useContext(AppContext)
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('create')
  const [spouseOneName, setSpouseOneName] = useState('')
  const [spouseTwoName, setSpouseTwoName] = useState('')


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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
            right: responsiveWidth(5),
            marginTop: responsiveHeight(1)
          }}
        >
          <TouchableOpacity onPress={() => setIsLogoutModalOpen(!isLogoutModalOpen)}>
            {wallet ?
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontFamily: fonts.italic, color: 'white', right: responsiveWidth(3) }}>
                  {`${wallet?.slice(0, 6)}...${wallet.slice(wallet?.length - 4, wallet?.length)}`}
                </Text>
                <ImageBackground
                  source={{ uri: nullProfileImageLink }}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </View>
              : null
            }
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          <Headliner
            text={'Marriage DAO 💍'}
            textStyle={{ textAlign: 'center' }}
          />
          <Headliner
            text={'Consumate Your Marriage on the Blockchain'}
            textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(14), color: '#ffffff99', marginBottom: responsiveWidth(3) }}
          />
          <TabsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            routes={[
              {
                key: 'create',
                title: 'Create',
              },
              {
                key: 'history',
                title: 'History',
              }
            ]}
          />
        </View>
        <ScrollView style={{ padding: responsiveWidth(5) }}>
          {activeTab === 'create' ?
            <>
              <Headliner
                text={'Spouse 1'}
                textStyle={{ fontSize: responsiveFontSize(22) }}
              />
              <TextInputter
                placeholder={'Name'}
                value={spouseOneName}
                onChangeText={(text: string) => setSpouseOneName(text)}
              />
              <Headliner
                text={'Spouse 2'}
                textStyle={{ fontSize: responsiveFontSize(22), marginTop: responsiveHeight(3) }}
              />
              <TextInputter
                placeholder={'Name'}
                value={spouseTwoName}
                onChangeText={(text: string) => setSpouseTwoName(text)}
              />
            </>
            :
            null
          }
          {activeTab === 'history' ?
            <></>
            :
            null
          }
        </ScrollView>
      </SafeAreaView>
      {/* START — USER LOGOUT POPUP */}
      {isLogoutModalOpen ?
        <View style={{ position: 'absolute', top: responsiveHeight(12), right: responsiveHeight(2), backgroundColor: '#1c1c1c', borderRadius: responsiveWidth(5), borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, width: responsiveWidth(44), padding: responsiveWidth(3) }}>
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
              <Ionicons name="return-down-back" size={22} color={'white'} />
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
      {/* END — USER LOGOUT POPUP */}
    </>
  );
}
