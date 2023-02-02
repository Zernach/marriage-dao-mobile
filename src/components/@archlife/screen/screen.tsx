/*
 * Use this file to create your container!
 * Containers should only contain styles if absolutely necessary! Leave that to components!
 * Your container should render one or more components
 * All functions should be defined in screen-functions so they can be exported and tested!
 */
import * as React from "react";
import { findNodeHandle } from "react-native";
import { Presentation } from "./screen-presentation";
import { ScreenProps } from "./screen-interface";
import { responsiveWidth } from "../../../theme/@archlife/constants";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

/**
 * Describe your component here
 */
export const Screen = (props: ScreenProps) => {

  const {
    menuItems = [],
    isHomeView,
    onEndReached,
    onEndReachedThreshold,
    bioExpanded,
    setBioExpanded,
    userProfileView,
    user,
    title,
    incomingStyle,
    style,
    isCurrentUser,
    editBio,
    headerChildren,
    onPressPersonalProfile,
    footerChildren,
    bodyChildren,
    hasTitle = true,
    onPressWatchlist,
    toggleFavoriteUser,
    hasNotificationsIcon,
    menuItemContainerStyle,
    coverImage,
    headerColors,
    setCurrentOpenView,
    hasCancel,
    onPressCancel,
    onPressInviteFriend,
    onPressNotifications = () => navigation.navigate('notifications'),
    hasScrollViewEnabled = true,
    hasScrollView = true,
    scrollViewStyle = {},
    hasFloatingButton,
    hasSolidFloatingButton,
    setUser,
    isShareTypeSelectionOpen,
    updateShareType,
    shareType,
    newlyTypedBio,
    setNewlyTypedBio,
    showingSeeMoreBio,
    setShowingSeeMoreBio,
    onPressFloatingButton,
    oneOnOneChannelId,
    manualScrollToTop,
    manualScrollToBottom,
    onPressBack,
    confettiCannonRef,
    onPressUserProfileImage,
    onPressProfileImageWhenViewingSelf,
    itemsMarginTopAnimatedValue,
    headerStyle,
    onPressWebsite,
    bodyStyle,
  } = props;

  const navigation = useNavigation()
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0] ? props.menuItems?.[0].name : "");
  const scrollViewRef = useRef();
  const scrollToEnd = () => title === "Chat" && (scrollViewRef?.current?.scrollToEnd({ animated: false }))
  const scrollToTop = () => {
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    })
  }

  useEffect(() => {
    if (manualScrollToTop) {
      scrollToTop()
    }
  }, [manualScrollToTop])

  useEffect(() => {
    if (manualScrollToBottom) {
      scrollViewRef?.current?.scrollToEnd({ animated: false })
    }
  }, [manualScrollToBottom])

  const handleScroll = (e) => { return };
  const scrollToItem = (name) => {
    setActiveMenuItem(name);
    menuItems
      .find(({ name: curr }) => curr === name)
      .ref.current.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: y - responsiveWidth(18),
            animated: true,
            useNativeDriver: false
          });
        }
      );
  };

  return (
    <Presentation
      scrollViewRef={scrollViewRef}
      scrollToEnd={scrollToEnd}
      scrollToTop={scrollToTop}
      isHomeView={isHomeView}
      onScroll={handleScroll}
      setUser={setUser}
      activeMenuItem={activeMenuItem}
      onSelectMenuItem={scrollToItem}
      onPressBack={onPressBack || (() => navigation.goBack())}
      onPressPersonalProfile={onPressPersonalProfile}
      onPressNotifications={onPressNotifications}
      navigation={navigation}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      bioExpanded={bioExpanded}
      setBioExpanded={setBioExpanded}
      user={user}
      style={incomingStyle}
      title={title}
      hasTitle={hasTitle}
      isCurrentUser={isCurrentUser}
      editBio={editBio}
      userProfileView={userProfileView}
      onPressNav={(screen) => navigation.navigate(screen)}
      headerChildren={headerChildren}
      footerChildren={footerChildren}
      bodyChildren={bodyChildren}
      toggleFavoriteUser={toggleFavoriteUser}
      onPressWatchlist={onPressWatchlist}
      hasNotificationsIcon={hasNotificationsIcon}
      menuItemContainerStyle={menuItemContainerStyle}
      coverImage={coverImage}
      headerColors={headerColors}
      setCurrentOpenView={setCurrentOpenView}
      hasCancel={hasCancel}
      onPressCancel={onPressCancel}
      onPressInviteFriend={onPressInviteFriend}
      hasScrollViewEnabled={hasScrollViewEnabled}
      hasScrollView={hasScrollView}
      scrollViewStyle={scrollViewStyle}
      hasFloatingButton={hasFloatingButton}
      isShareTypeSelectionOpen={isShareTypeSelectionOpen}
      updateShareType={updateShareType}
      shareType={shareType}
      newlyTypedBio={newlyTypedBio}
      setNewlyTypedBio={setNewlyTypedBio}
      showingSeeMoreBio={showingSeeMoreBio}
      setShowingSeeMoreBio={setShowingSeeMoreBio}
      onPressFloatingButton={onPressFloatingButton}
      oneOnOneChannelId={oneOnOneChannelId}
      hasSolidFloatingButton={hasSolidFloatingButton}
      confettiCannonRef={confettiCannonRef}
      onPressUserProfileImage={onPressUserProfileImage}
      onPressProfileImageWhenViewingSelf={onPressProfileImageWhenViewingSelf}
      itemsMarginTopAnimatedValue={itemsMarginTopAnimatedValue}
      headerStyle={headerStyle}
      onPressWebsite={onPressWebsite}
      bodyStyle={bodyStyle}
      {...props}
    />
  );
};
