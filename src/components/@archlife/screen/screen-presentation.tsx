/*
 * This file is responsible for how your container looks.
 * Be mindful that inside storybooks you may not have access to the app's state and navigation
 * Treat this file as a component, it should not have any logic in it.
 * All functions and values should be passed to this container via props so they can be mocked for testing.
 */
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, View, } from "react-native";
import { HeaderView } from "../header-view/header-view";
import { responsiveHeight, responsiveWidth } from "../../../theme/@archlife/constants";
import { ScreenProps, } from "./screen-interface";
import { useRef, useState } from "react";

export const Presentation = ({
  title,
  hasTitle,
  menuItems,
  menuItemContainerStyle,
  unreadNotifications,
  activeMenuItem,
  hasBackButton = true,
  onPressNotifications,
  onSelectMenuItem,
  onPressBack,
  onPressInviteFriend,
  style: incomingStyle,
  scrollViewRef,
  scrollToEnd,
  scrollToTop,
  onPressPersonalProfile,
  onEndReachedThreshold = 0.05,
  onScroll,
  navigation,
  onEndReached,
  children,
  userProfileView,
  user,
  isCurrentUser,
  editBio,
  headerChildren,
  footerChildren,
  bodyChildren,
  isHomeView,
  collapseHeaderEnabled = false,
  onPressOpen,
  onPressNav,
  scrollViewProps,
  scrollViewStyle,
  hasNotificationsIcon,
  toggleFavoriteUser,
  hasNavbar = true,
  coverImage,
  headerColors,
  hasCancel,
  onPressCancel,
  currentScreen,
  hasScrollViewEnabled,
  hasScrollView,
  hasFloatingButton,
  floatingButtonText,
  onPressFloatingButton,
  floatingButtonTextColor = "#ffffff",
  floatingButtonColors = ["#000", "#000"],
  floatingButtonShadowColor = "transparent",
  setUser,
  isShareTypeSelectionOpen,
  updateShareType,
  shareType,
  newlyTypedBio,
  setNewlyTypedBio,
  showingSeeMoreBio,
  setShowingSeeMoreBio,
  hasSolidFloatingButton,
  oneOnOneChannelId,
  confettiCannonRef,
  onPressUserProfileImage,
  onPressProfileImageWhenViewingSelf,
  itemsMarginTopAnimatedValue,
  headerStyle,
  onPressWebsite,
  bodyStyle = {},
}: ScreenProps) => {

  const [opened, setOpened] = useState(true);

  const [lastOffset, setLastOffset] = useState(0);
  const outerScrollRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(
    isHomeView
      ? responsiveWidth(65)
      : responsiveWidth(15)
  );
  const close = () => {
    outerScrollRef.current.scrollTo({ y: headerHeight + responsiveWidth(15) });
    setOpened(false);
  };
  const open = () => {
    outerScrollRef.current.scrollTo({ y: 0 });
    setOpened(true);
  };
  const handleScroll = ({ nativeEvent }) => {
    if (!collapseHeaderEnabled) {
      return;
    }
    const { y } = nativeEvent.contentOffset;
    const bottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height;
    if (y <= 0) {
      return open()
    }
    if (bottom - onEndReachedThreshold * bottom < y && onEndReached) {
      // console.log('handleScroll', 'endReached')
      onEndReached?.();
    }
    if (
      (y >= lastOffset && y > responsiveWidth(2.4)) ||
      bottom - 0.05 * bottom < y
    ) {
      // console.log('handleScroll', 'close')
      // setTimeout(() => {
      setLastOffset(y);
      // }, 200)
      return close();
    }
    // console.log('handleScroll', 'open - default')
    if (y + responsiveWidth(30) <= lastOffset && y < responsiveHeight(30)) {
      open();
    }
    setTimeout(() => {
      setLastOffset(y);
    }, 0);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        overScrollMode={'never'}
        style={{ flex: 1, height: responsiveHeight(100) }}
        scrollEventThrottle={100}
        ref={(ref) => { outerScrollRef.current = ref }}
        snapToInterval={2000}
        decelerationRate={0}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <LinearGradient
          colors={[`#1c1c1c`, `#000000`]}
          style={{ flex: 1 }}
        >
          {userProfileView ? (
            <></>
          ) : isHomeView ? (
            <></>
          ) : (
            <HeaderView
              title={title}
              hasTitle={hasTitle}
              menuItems={menuItems}
              unreadNotifications={unreadNotifications}
              activeMenuItem={activeMenuItem}
              hasBackButton={hasBackButton}
              onPressNotifications={onPressNotifications}
              onSelectMenuItem={onSelectMenuItem}
              onPressBack={onPressBack}
              style={incomingStyle}
              onSetHeaderHeight={setHeaderHeight}
              opened={opened}
              open={open}
              navigation={navigation}
              headerChildren={headerChildren}
              menuItemContainerStyle={menuItemContainerStyle}
              hasNotificationsIcon={hasNotificationsIcon}
              coverImage={coverImage}
              headerColors={headerColors}
              hasCancel={hasCancel}
              onPressCancel={onPressCancel}
              headerStyle={headerStyle}
            />
          )}
          {bodyChildren}
          {hasScrollView ?
            <ScrollView
              overScrollMode={'never'}
              scrollEnabled={hasScrollViewEnabled}
              style={{
                flex: 1,
                minHeight: responsiveHeight(87),
                maxHeight: responsiveHeight(100),
                ...scrollViewStyle
              }}
              contentContainerStyle={{ ...scrollViewStyle }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onLayout={scrollToEnd}
              ref={(ref) => (scrollViewRef.current = ref)}
              onScrollBeginDrag={handleScroll}
              onMomentumScrollBegin={() => null}
              onScroll={(e) => {
                onScroll(e);
                handleScroll(e);
              }}
              scrollEventThrottle={100}
              {...scrollViewProps}
            >
              <View style={{ marginBottom: responsiveHeight(20) }}>
                {children}
              </View>
            </ScrollView>
            :
            <View style={{ height: responsiveHeight(87), ...bodyStyle }}>
              {children}
            </View>
          }
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
