/*
 * Use this file to create your component!
 * Components should not contain internal state or logic! Leave that to containers or screens!
 * Use the presets file to create new variations of your component
 * Each preset can have it's own variables that are used to render it, like styles or boolean flags
 */
import * as React from "react";
import { HeaderViewProps } from "./header-view-interface";
import { useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Animated, StyleSheet, } from "react-native";
import { responsiveFontSize, responsiveWidth, hitSlop, responsiveHeight } from "../../../theme/@archlife/constants";
import { useEffect } from "react";
import { BaseHeaderView } from "../base-header-view/base-header-view";
import { FadeInView } from "../fade-in-view/fade-in-view";
import { fonts } from "../../../theme/@stem/fonts";
import { Ionicons } from "@expo/vector-icons";

/**
 * This component is used for the top heading/header for many pages.
 */
export const HeaderView = (
  props: HeaderViewProps
) => {
  const {
    title,
    hasTitle,
    menuItems,
    unreadNotifications,
    activeMenuItem,
    hasBackButton = true,
    hasNotificationsIcon = true,
    onPressNotifications,
    onSelectMenuItem,
    onPressBack,
    onSetHeaderHeight,
    style,
    opened,
    open,
    preset,
    headerChildren,
    coverImage,
    menuItemContainerStyle,
    headerColors,
    hasCancel,
    onPressCancel,
    headerStyle,
  } = props;

  // ANIMATED FADING EFFECTS
  const [fadeInHeader] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeInHeader, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false
    }).start();
  }, []);

  // THIS INNER VIEW IS INSERTED INTO ONE OF THE OUTER VIEWS DEFINED AT BOTTOM OF THIS FILE
  const innerHeaderView = (
    <Animated.View style={{ flex: 1, opacity: fadeInHeader }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-start",
            marginTop: responsiveHeight(1),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginLeft: responsiveWidth(8),
              alignItems: "center",
            }}
          >
            {opened && hasBackButton && (
              <TouchableOpacity
                hitSlop={{
                  top: responsiveWidth(12),
                  bottom: responsiveWidth(10),
                  left: responsiveWidth(12),
                  right: responsiveWidth(12),
                }}
                onPress={onPressBack}
                style={{ zIndex: 1000 }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    transform: [{ scaleY: 2 }],
                    paddingBottom: responsiveWidth(0.7),
                    fontSize: responsiveFontSize(17),
                    fontFamily: fonts.medium,
                    zIndex: 1000,
                  }}
                >{"<"}</Text>
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: "#ffffff",
                fontSize: responsiveFontSize(22),
                marginHorizontal: hasBackButton
                  ? responsiveWidth(4.8)
                  : responsiveWidth(1),
                marginTop: hasBackButton
                  ? responsiveWidth(-0.3)
                  : responsiveWidth(1),
                textAlign: "left",
                fontFamily: fonts.semiBold,
              }}
            >
              {hasTitle && opened &&
                title
              }
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginRight: responsiveWidth(8) }} >
            {hasCancel && (
              <FadeInView duration={400}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 10, left: 50, right: 20 }}
                  style={HeaderViewStyles.xButton}
                  onPress={onPressCancel}
                >
                  <Text style={HeaderViewStyles.xTextButton}  >
                    {"X"}
                  </Text>
                </TouchableOpacity>
              </FadeInView>
            )}
          </View>
        </View>
        <FadeInView duration={400}>
          {headerChildren}
        </FadeInView>
        <View
          style={{
            flexDirection: "row",
            flex: 0,
            justifyContent: "flex-start",
            marginBottom: responsiveHeight(1),
            marginHorizontal: responsiveWidth(10),
            ...menuItemContainerStyle,
          }}
        >
          {opened ? (
            menuItems?.map((menuItem, menuIndex) => {
              let isActive = activeMenuItem == menuItem.name
              return (
                <TouchableOpacity
                  key={`index${menuIndex}`}
                  onPress={() => {
                    if (menuItem.onPress) {
                      return menuItem.onPress();
                    }
                    onSelectMenuItem?.(menuItem.name);
                  }}
                  style={{
                    backgroundColor: isActive ? '#ff69b4' : "transparent",
                    borderRadius: 30,
                    borderColor: menuItem?.borderColor || '#ff69b4',
                    borderWidth: StyleSheet.hairlineWidth * 2,
                    paddingHorizontal: responsiveWidth(6),
                    zIndex: 100,
                    paddingVertical: responsiveWidth(0.9),
                    justifyContent: 'center',
                    marginHorizontal: responsiveWidth(1)
                  }}
                >
                  <Text
                    style={{
                      color: menuItem?.textColor || (isActive ? "#000000" : UserStore.currentUser.profile_primary_color),
                      fontSize: responsiveFontSize(20),
                      textAlign: "center",
                      fontFamily: fonts.bold,
                    }}
                  >
                    {menuItem.name}
                  </Text>
                </TouchableOpacity>
              )
            })
          ) : (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: responsiveWidth(2.4),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: responsiveWidth(8),
                  alignItems: "center",
                }}
              >
                {hasBackButton && (
                  <TouchableOpacity
                    hitSlop={{
                      top: responsiveWidth(12),
                      bottom: responsiveWidth(12),
                      left: responsiveWidth(12),
                      right: responsiveWidth(12),
                    }}
                    onPress={onPressBack}
                    style={{ zIndex: 100 }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        transform: [{ scaleY: 2 }],
                        paddingBottom: responsiveWidth(0.48),
                        fontSize: responsiveFontSize(17),
                        fontFamily: fonts.medium,
                        zIndex: 100,
                      }}
                    >{`<`}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPress={open}
                hitSlop={hitSlop}
                style={{
                  paddingTop: responsiveWidth(0.6),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="arrow-back" size={22} color={'#ffffff50'} style={{ top: StyleSheet.hairlineWidth * 10 }} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  marginRight: responsiveWidth(8),
                }}
              >
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );

  // RETURNED OUTER HEADER VIEW WITH LINEAR GRADIENT (no cover image)
  if (!coverImage) {
    return (
      <BaseHeaderView
        opened={true}
        onSetHeaderHeight={onSetHeaderHeight}
        headerColors={headerColors}
        headerStyle={headerStyle}
      >
        {innerHeaderView}
      </BaseHeaderView>
    );
  }

  // RETURNED OUTER HEADER VIEW W/ COVER IMAGE
  if (coverImage) {
    return (
      <View
        style={{
          shadowColor: "#1C1C1C",
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 5 },
          minHeight: responsiveWidth(40),
        }}
      >
        <View
          style={{
            // borderBottomRightRadius: responsiveWidth(7.2),
            // borderBottomLeftRadius: responsiveWidth(7.2),
            flex: 1,
            overflow: "hidden",
            height: coverImage ? responsiveWidth(90) : null,
            ...style,
          }}
        >
          <ImageBackground
            source={coverImage}
            style={{ flex: 1, width: "100%" }}
            imageStyle={{
              // borderBottomRightRadius: responsiveWidth(7.2),
              // borderBottomLeftRadius: responsiveWidth(7.2),
            }}
          >
            {innerHeaderView}
          </ImageBackground>
        </View>
      </View>
    );
  }
};

const HeaderViewStyles = StyleSheet.create({
  xButton: {
    backgroundColor: "#ffffff50",
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: responsiveHeight(1),
    right: 0,
    borderRadius: responsiveWidth(50),
    zIndex: 10000000
  },
  xTextButton: {
    color: "#1c1c1c",
    position: 'absolute',
    textAlign: 'center',
    fontWeight: "400",
    fontSize: responsiveFontSize(12),
    transform: [{ scaleX: 2.5 }, { scaleY: 2 }],
  },
})
