/*
 * Generally, components should not contain internal state/logic!
 * Generally, we want all state/logic variables to be in the screen-functions.ts files so we have access to them all in one place.
 * This is because we want to be able to easily change the state/logic of the screen in one place.
 * It is okay to include internal state/logic if multiple instances of this component are needed on a single screen.
 * Don't forget to add all props in the interface file!
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabsViewProps } from './tabs-view-interface'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fonts, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../theme'
import { LinearGradient } from 'expo-linear-gradient'

/**
 * Describe the new component here...
 */
export const TabsView = (props: TabsViewProps) => {
  const { routes, setActiveTab, activeTab } = props

  return (
    <LinearGradient style={{ ...styles.tabView }} colors={['#ff69b499', '#ff69b470']}>
      {routes?.map((tab, index) => {
        const isCurrentlyActiveTab = activeTab === tab?.key
        return (
          <TouchableWithoutFeedback
            key={`index${index}`}
            onPress={() => setActiveTab(tab?.key)}
            style={{
              ...styles.singleTabView,
              width: responsiveWidth(95) / routes.length,
              borderBottomWidth: isCurrentlyActiveTab ? responsiveWidth(0.5) : 0,
              borderBottomColor: '#ffffff',
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{
                ...styles.tabBarLabel,
                color: isCurrentlyActiveTab
                  ? '#ffffff'
                  : '#ffffff80',
              }}
            >
              {tab?.title?.toUpperCase()}
            </Text>
          </TouchableWithoutFeedback>
        )
      })}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingTop: responsiveHeight(1.3),
    paddingBottom: responsiveHeight(1.1),
    fontSize: responsiveFontSize(11),
    fontFamily: fonts.italic,
  },
  tabBarLabel: {
    textAlign: 'center',
    fontSize: responsiveFontSize(17),
    fontFamily: fonts.bold,
    position: 'absolute',
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
  },
  singleTabView: {
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(20),
  },
})