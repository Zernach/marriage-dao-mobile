/*
* Components should not contain internal state or logic! Leave that to containers or screens!
* You may choose to use the presets file to create new variations of your component.
* Don't forget to go add all params to your interface file!
*/

import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
import { FadeInViewProps } from './fade-in-view-interface'

/**
 * Describe your new component here...
 */
export const FadeInView = (props: FadeInViewProps) => {

  // INCOMING PROPS
  const {
    duration: incomingDuration,
    delay,
    style,
    children
  } = props

  const duration = useMemo(() => incomingDuration, [incomingDuration])
  const [fadeInView] = useState(new Animated.Value(duration ? 0 : 1))

  if (duration) {
    useEffect(() => {
      Animated.timing(fadeInView, {
        toValue: 1,
        duration,
        delay: delay || 0,
        useNativeDriver: false
      }).start()
    }, [])
  }

  return (
    <Animated.View style={{ flex: 1, ...style, opacity: fadeInView }}>
      {children}
    </Animated.View>
  )
}