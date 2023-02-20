/*
* This file is responsible for how your screen looks.
* Be mindful that inside storybooks you may not have access to the app's state and navigation
* Treat this file as a component, it should not have any logic in it.
* All functions and values should be passed to this screen via props so they can be mocked for testing.
*/
import * as React from "react"
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import WebView from "react-native-webview"
import { fonts } from "../../theme/@stem/fonts"
import { hitSlop, responsiveFontSize, responsiveHeight, responsiveWidth } from "../../theme/@archlife/constants"
import { WebviewProps } from "./webview-interface"
import { Screen } from "../../components/@archlife/screen/screen"
import { Ionicons } from "@expo/vector-icons"

export const Presentation = ({
  title,
  onPressBack,
  webviewRef,
  weblink,
  setWeblink,
  typedLink,
  setTypedLink,
  onNavigateToAnotherWebsiteWithinWebview,
  onPressBackToPreviousWebsite,
  onPressForwardToNextWebsite,
  isWebviewLoading,
  setIsWebviewLoading,
  onPressShareWebsite,
  onPressBackOverride,
  onPressWebviewStatus,
  onSubmitEditing,
}: WebviewProps) => {

  return (
    <Screen
      title={title || "Back to STEM"}
      hasNotificationsIcon={false}
      hasNavbar={false}
      hasScrollView={false}
      onPressBack={onPressBackOverride || onPressBack}
      isHomeView={false}
      headerStyle={{ minHeight: responsiveHeight(14) }}
      bodyStyle={{ height: responsiveHeight(90) }}
      headerChildren={
        <>
          <View style={{
            position: 'absolute',
            right: responsiveWidth(1),
            top: responsiveWidth(-6),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              hitSlop={{...hitSlop, right: responsiveWidth(5)}}
              onPress={onPressShareWebsite}
              style={{ marginRight: responsiveWidth(5) }}
            >
              <Ionicons
                name="share-social-outline"
                size={20}
                color="#ffffff99"
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...webviewStyles.headerChildren, marginTop: Platform.OS === 'ios' ? responsiveHeight(1.5) : responsiveHeight(3) }}>
            <View style={webviewStyles.backForwardButtonsView}>
              {[
                {
                  icon: "<",
                  onPress: onPressBackToPreviousWebsite,
                  style: webviewStyles.backButton,
                  hitSlop: {
                    top: responsiveWidth(2),
                    bottom: responsiveWidth(2),
                    left: responsiveWidth(4),
                  },
                },
                {
                  icon: ">",
                  onPress: onPressForwardToNextWebsite,
                  style: webviewStyles.forwardButton,
                  hitSlop: {
                    top: responsiveWidth(2),
                    bottom: responsiveWidth(2),
                    right: responsiveWidth(1),
                  },
                },
              ].map((item, itemIndex) => (
                <TouchableOpacity key={`index${itemIndex}`} onPress={item.onPress} style={item.style} hitSlop={item.hitSlop}>
                  <Text numberOfLines={1} style={webviewStyles.backForwardText}>{item.icon}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={onPressWebviewStatus} style={{ width: responsiveWidth(7), ...webviewStyles.activityIndicator }}>
                {isWebviewLoading ?
                  <ActivityIndicator size={'small'} color={'#ffffff99'} animating={true} style={{ ...webviewStyles.activityIndicator }} />
                  :
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#ffffff99"
                    style={{ marginRight: 5 }}
                  />
                }
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder={'Type URL here...'}
              value={typedLink}
              onChangeText={setTypedLink}
              style={{ ...webviewStyles.urlTextInput, flex: 1 }}
              selectTextOnFocus={true}
              placeholderTextColor={'#ffffff99'}
              clearButtonMode={'while-editing'}
              onSubmitEditing={onSubmitEditing}
              autoCapitalize={'none'}
              autoComplete={'off'}
              autoCorrect={false}
              returnKeyType={'go'}
              keyboardType={'url'}
              selectionColor={'#ffffff99'}
            />
          </View>
        </>
      }
    >
      <WebView
        source={{ uri: weblink }}
        ref={webviewRef}
        allowsFullscreenVideo={false}
        videoFullscreen={false}
        mediaPlaybackRequiresUserAction={true}
        contentMode={"mobile"}
        pullToRefreshEnabled={true}
        onNavigationStateChange={onNavigateToAnotherWebsiteWithinWebview}
        // onMessage={event => {
        //   const parsedInt = parseInt(event.nativeEvent.data)
        //   parsedInt && setHeight(parsedInt);
        // }}
        // injectedJavaScript={`window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); true;`}
        containerStyle={{ paddingBottom: responsiveHeight(7) }}
        onLoadStart={() => setIsWebviewLoading?.(true)}
        onLoadEnd={() => setIsWebviewLoading?.(false)}
        onError={() => Alert.alert('There was an error loading the website. Please try again later.')}
        onHttpError={() => Alert.alert('There was an error loading the website. Please try again later.')}
      />
    </Screen>
  )
}

const webviewStyles = StyleSheet.create({
  headerChildren: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#222222',
    borderRadius: responsiveWidth(1.5),
    borderColor: '#ffffff60',
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  backForwardButtonsView: {
    flexDirection: 'row',
  },
  backForwardText: {
    color: '#ffffff80',
    fontFamily: fonts.italic,
    padding: responsiveWidth(1),
    transform: [{
      scaleY: 1.75
    }]
  },
  urlTextInput: {
    width: responsiveWidth(75),
    paddingTop: responsiveWidth(0.25),
    paddingHorizontal: responsiveWidth(2),
    fontFamily: fonts.medium,
    fontSize: responsiveFontSize(14),
    borderLeftColor: '#ffffff60',
    borderLeftWidth: StyleSheet.hairlineWidth * 2,
    color: '#ffffff99',
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(1),
  },
  forwardButton: {
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(0.7),
    paddingLeft: responsiveWidth(1.5),
    borderRightColor: '#ffffff60',
    borderRightWidth: StyleSheet.hairlineWidth * 3,
    borderLeftColor: '#ffffff60',
    borderLeftWidth: StyleSheet.hairlineWidth * 3,
  },
  activityIndicator: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
