import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { RootState } from '../context/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/AppProvider';
import { Ionicons } from '@expo/vector-icons';
import { setWallet } from '../context/store/wallet';
import { fonts, nullProfileImageLink, responsiveFontSize, responsiveHeight, responsiveWidth } from '../theme';
import { TabsView } from '../components/@archlife/tabs-view/tabs-view';
import { TextInputter } from '../components/@archlife/text-inputter/text-inputter';
import { Headliner } from '../components/headliner/headliner';
import CustomButton from '../components/CustomButton';
import { FadeInImage } from '../components/@archlife/fade-in-image/fade-in-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ShadeColor } from '../scripts/shade-color/shade-color';

export default function HomeScreen({ navigation }) {
  const wallet = useSelector((state: RootState) => {
    // console.log("Wallet —> ", state)
    return state.wallet.walletAddress
  });
  const { setCurrentWalletAddress, claimNFTtoCurrentWallet, currentNFTsInWallet, connector } = useContext(AppContext)
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('create')
  const [currentCreateIndex, setCurrentCreateIndex] = useState(0)
  const [contractDetails, setContractDetails] = useState({
    spouseOneName: '',
    spouseTwoName: '',
    numberOfYearsUntil5050: '',
    vestingPeriods: [
      {
        year: '1',
        percentage: '0'
      }
    ],
  })

  const logout = () => {
    if (connector.connected) {
      connector.killSession();
    }
    setCurrentWalletAddress("")
    dispatch(setWallet(""))
  }

  const onPressAddAnotherYear = () => {
    setContractDetails({
      ...contractDetails,
      numberOfYearsUntil5050: `${parseInt(contractDetails.numberOfYearsUntil5050) + 1}`,
      vestingPeriods: [...contractDetails.vestingPeriods, {
        year: contractDetails.vestingPeriods.length + 1,
        percentage: 0
      }]
    })
  }

  const onPressTrashCan = (indexToDelete: number) => {
    setContractDetails({
      ...contractDetails,
      numberOfYearsUntil5050: `${parseInt(contractDetails.numberOfYearsUntil5050) - 1}`,
      vestingPeriods: contractDetails?.vestingPeriods.filter((period: any, periodIndex: number) => periodIndex !== indexToDelete)
    })
  }

  useEffect(() => {
    if (contractDetails.numberOfYearsUntil5050) {
      // Update the vesting periods based on the number of years until 50/50
      // Each percentage should increase every year until equal to 1
      const vestingPeriods = []
      const numYears = parseInt(contractDetails.numberOfYearsUntil5050)
      for (let i = 1; i <= numYears; i++) {
        vestingPeriods.push({
          year: `${i}`,
          percentage: `${i / numYears}`
        })
      }
      setContractDetails({
        ...contractDetails,
        vestingPeriods
      })
    }
  }, [contractDetails.numberOfYearsUntil5050])

  const onPressGetMarriedAgain = () => {
    setCurrentCreateIndex(0)
    setContractDetails({
      spouseOneName: '',
      spouseTwoName: '',
      numberOfYearsUntil5050: '',
      vestingPeriods: [],
    })
  }

  const onPressViewCompletedContract = () => {
    onPressGetMarriedAgain()
    setActiveTab('history')
  }

  const onPressGetMarried = useCallback(() => {
    claimNFTtoCurrentWallet()
    setCurrentCreateIndex(2)
  }, [])

  const onPressOwnedNFT = (clickedNFT: string) => {
    navigation.navigate('Webview', { link: clickedNFT?.metadata?.external_url, title: clickedNFT?.metadata?.name })
  }

  const onPressThirdWebMarriageNFTCollectionBadge = () => {
    navigation.navigate('Webview', { link: 'https://thirdweb.com/polygon/0x38ccD5B179Db21e8C896704cb019af3AF9Eeb89F?utm_source=contract_badge', title: 'Marriage NFT Collection' })
  }

  return (
    <>
      <LinearGradient style={{ flex: 1 }} colors={[ShadeColor('#1c1c1c', 20), ShadeColor('#1c1c1c', -40)]}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              marginHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(1)
            }}
          >
            <TouchableOpacity onPress={onPressThirdWebMarriageNFTCollectionBadge} style={{ flex: 1, flexDirection: 'row' }}>
              <FadeInImage
                localFile={require('../assets/images/marriage-nft-collection-id-thirdweb.png')}
                // style={{ width: 200, height: 45 }}
                imageStyle={{ width: 200 * 0.8, height: 45 * 0.8 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogoutModalOpen(!isLogoutModalOpen)}>
              {wallet ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: responsiveFontSize(14), fontFamily: fonts.medium, color: 'white', right: responsiveWidth(3) }}>
                    {`${wallet?.slice(0, 6)}. . .${wallet.slice(wallet?.length - 4, wallet?.length)}`}
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
          <>
            {currentCreateIndex > 0 && currentCreateIndex !== 2 ?
              <TouchableOpacity onPress={() => setCurrentCreateIndex(currentCreateIndex - 1)}>
                <Headliner
                  text={'← Back'}
                  textStyle={{ fontSize: responsiveFontSize(14), color: '#ffffff99', marginBottom: responsiveWidth(3), marginLeft: responsiveWidth(5) }}
                />
              </TouchableOpacity>
              : null
            }
            {currentCreateIndex === 0 || currentCreateIndex === 2 ?
              <View style={{ paddingHorizontal: responsiveWidth(5) }}>
                <Headliner
                  text={'Marriage DAO 💍'}
                  textStyle={{ textAlign: 'center' }}
                />
                <Headliner
                  text={'Make Your Marriage Official on the Blockchain'}
                  // text={'Consumate Your Marriage Official on the Blockchain'}
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
              : null
            }
          </>
          <ScrollView style={{ padding: responsiveWidth(5) }} showsVerticalScrollIndicator={false}>
            {activeTab === 'create' ?
              <>
                {currentCreateIndex === 0 ?
                  <>
                    <Headliner
                      text={'Spouse 1'}
                      textStyle={{ fontSize: responsiveFontSize(22) }}
                    />
                    <TextInputter
                      placeholder={'Name'}
                      value={contractDetails?.spouseOneName}
                      onChangeText={(text: string) => setContractDetails({
                        ...contractDetails,
                        spouseOneName: text
                      })
                      }
                    />
                    <Headliner
                      text={'Spouse 2'}
                      textStyle={{ fontSize: responsiveFontSize(22), marginTop: responsiveHeight(3) }}
                    />
                    <TextInputter
                      placeholder={'Name'}
                      value={contractDetails?.spouseTwoName}
                      onChangeText={(text: string) => setContractDetails({
                        ...contractDetails,
                        spouseTwoName: text
                      })
                      }
                    />
                    <Headliner
                      text={'Agreement Duration'}
                      textStyle={{ fontSize: responsiveFontSize(22), marginTop: responsiveHeight(3) }}
                    />
                    <TextInputter
                      placeholder={'Years until 50/50 (e.g.: 5, 10, etc.)'}
                      value={contractDetails?.numberOfYearsUntil5050}
                      onChangeText={(text: string) => setContractDetails({
                        ...contractDetails,
                        numberOfYearsUntil5050: text
                      })
                      }
                    />
                    {contractDetails?.spouseOneName && contractDetails?.spouseTwoName && contractDetails?.numberOfYearsUntil5050 ?
                      <CustomButton
                        label={"Confirm"}
                        onPress={() => setCurrentCreateIndex(1)}
                        style={{ marginTop: responsiveHeight(4), backgroundColor: !contractDetails?.spouseOneName && !contractDetails?.spouseTwoName && !contractDetails?.numberOfYearsUntil5050 ? '#ff69b499' : '#ff69b4' }}
                      />
                      : null
                    }
                  </>
                  : null
                }
                {currentCreateIndex === 1 ?
                  <>
                    <Headliner
                      text={'Vesting Schedule'}
                      textStyle={{ fontSize: responsiveFontSize(22) }}
                    />
                    {contractDetails?.vestingPeriods?.map((period: any, index: number) => (
                      <View key={`index${index}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInputter
                          placeholder={'Year'}
                          value={contractDetails?.vestingPeriods[index]?.year}
                          style={{ width: responsiveWidth(40) }}
                          onChangeText={(text: string) => {
                            let newVestingPeriods = contractDetails?.vestingPeriods
                            newVestingPeriods[index].year = text
                            setContractDetails({
                              ...contractDetails,
                              vestingPeriods: newVestingPeriods
                            })
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => onPressTrashCan(index)}
                          style={{ height: responsiveWidth(10), justifyContent: 'flex-end' }}
                        >
                          <Ionicons name="trash-outline" size={22} color={'#ffffff50'} style={{ top: StyleSheet.hairlineWidth * 10 }} />
                        </TouchableOpacity>
                        <TextInputter
                          placeholder={'Percentage'}
                          value={contractDetails?.vestingPeriods[index]?.percentage}
                          style={{ width: responsiveWidth(40) }}
                          onChangeText={(text: string) => {
                            let newVestingPeriods = contractDetails?.vestingPeriods
                            newVestingPeriods[index].percentage = text
                            setContractDetails({
                              ...contractDetails,
                              vestingPeriods: newVestingPeriods
                            })
                          }}
                        />
                      </View>
                    ))}
                    <CustomButton
                      label={"Add Another Year (+)"}
                      onPress={onPressAddAnotherYear}
                      style={{ marginTop: responsiveHeight(4), backgroundColor: '#ff69b420', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2 }}
                    />
                    <CustomButton
                      label={"Get Married!"}
                      onPress={onPressGetMarried}
                      style={{ backgroundColor: !contractDetails?.spouseOneName && !contractDetails?.spouseTwoName && !contractDetails?.numberOfYearsUntil5050 ? '#ff69b499' : '#ff69b4' }}
                    />
                  </>
                  : null
                }
                {currentCreateIndex === 2 ?
                  <View style={{ paddingHorizontal: responsiveWidth(5) }}>
                    <Headliner
                      text={`Congratulations! 💍\n\nYou've been married!`}
                      textStyle={{ fontSize: responsiveFontSize(22), textAlign: 'center', marginBottom: responsiveHeight(3) }}
                    />
                    {/* <WebView
                    source={{ uri: 'https://gateway.ipfscdn.io/ipfs/QmbqEq5EQLx1aPurZFreM246fsKeawfpKDT8uzguAHAikr/erc1155.html?contract=0x38ccD5B179Db21e8C896704cb019af3AF9Eeb89F&chainId=137&tokenId=0' }}
                    allowsFullscreenVideo={false}
                    videoFullscreen={false}
                    style={{ height: responsiveHeight(100), width: responsiveWidth(100) }}
                    mediaPlaybackRequiresUserAction={true}
                    contentMode={"mobile"}
                    pullToRefreshEnabled={true}
                    containerStyle={{ paddingBottom: responsiveHeight(7) }}
                    onError={() => Alert.alert('There was an error loading the website. Please try again later.')}
                    onHttpError={() => Alert.alert('There was an error loading the website. Please try again later.')}
                  /> */}
                    <CustomButton
                      label={"View Contract"}
                      onPress={onPressViewCompletedContract}
                      style={{ backgroundColor: 'transparent', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, }}
                    />
                    <CustomButton
                      label={"Get Married Again"}
                      onPress={onPressGetMarriedAgain}
                      style={{ backgroundColor: 'transparent', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, }}
                    />
                  </View>
                  : null
                }
              </>
              :
              null
            }
            {activeTab === 'history' ?
              <>
                {currentNFTsInWallet?.map((nft: any, index: number) => {
                  return <View key={`${index}index`}>
                    {[...Array(parseInt(nft?.quantityOwned)).keys()].map((i: number) => (
                      <TouchableOpacity
                        key={`index${index}${i}`}
                        onPress={() => onPressOwnedNFT(nft)}
                        style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: responsiveWidth(5), padding: responsiveWidth(2), marginBottom: responsiveHeight(2) }}
                      >
                        <FadeInImage
                          style={{ width: responsiveWidth(20), height: responsiveWidth(20), borderRadius: responsiveWidth(5), marginRight: responsiveWidth(2) }}
                          imageUri={nft?.metadata?.image}
                        />
                        <View key={`index${index}`} style={{ justifyContent: 'space-between' }}>
                          <Headliner text={`${nft?.metadata?.name}`} textStyle={{ fontSize: responsiveFontSize(24) }} style={{ width: responsiveWidth(70) }} />
                          <Headliner text={`Description: ${nft?.metadata?.description}`} textStyle={{ fontSize: responsiveFontSize(12), marginTop: responsiveWidth(2) }} style={{ width: responsiveWidth(70) }} />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                })}
              </>
              :
              null
            }
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      {/* START — USER LOGOUT POPUP */}
      {isLogoutModalOpen ?
        <View style={{ position: 'absolute', top: responsiveHeight(13), right: responsiveHeight(2), backgroundColor: '#1c1c1c', borderRadius: responsiveWidth(5), borderColor: '#ff69b4', borderWidth: StyleSheet.hairlineWidth * 2, width: responsiveWidth(44), paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(2) }}>
          <TouchableOpacity
            onPress={() => { return logout() }}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="exit-outline" size={22} color={'#ffffff99'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.medium,
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
              <Ionicons name="return-down-back" size={22} color={'#ffffff99'} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.medium,
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
