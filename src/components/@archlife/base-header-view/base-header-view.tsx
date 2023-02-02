/*
 * Use this file to create your component!
 * Components should not contain internal state or logic! Leave that to containers or screens!
 * Use the presets file to create new variations of your component
 * Each preset can have it's own variables that are used to render it, like styles or boolean flags
 */
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { responsiveWidth, } from "../../../theme/@archlife/constants";
import { BaseHeaderViewProps } from "./base-header-view-interface";

/**
 * Describe your component here
 */
export const BaseHeaderView = (props: BaseHeaderViewProps) => {

  const {
    style,
    opened,
    open,
    renderClosed,
    linearGradientProps,
    preset,
    children,
    onSetHeaderHeight,
    headerColors = false,
    headerStyle,
  } = props;

  return (
    <View
      style={{
        shadowColor: "#1C1C1C",
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 5 },
        minHeight: responsiveWidth(40),
        ...headerStyle
      }}
    >
      <View
        style={{
          width: "100%",
          borderBottomRightRadius: responsiveWidth(7.2),
          borderBottomLeftRadius: responsiveWidth(7.2),
          flex: 1,
          overflow: "hidden",
          ...style,
        }}
      >
        <LinearGradient
          colors={headerColors || ["#1C1C1C", "#000000"]}
          {...linearGradientProps}
          style={{ flex: 1 }}
        >
          <View style={{ top: opened ? undefined : responsiveWidth(-5) }}>
            {children}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
