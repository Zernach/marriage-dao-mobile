/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props.
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { ViewStyle } from 'react-native'

export interface FadeInViewProps {
  /**
  * Style override useful for padding & margin
  * @optional
  */
  style?: ViewStyle;
  /**
  * Number of miliseconds it takes to fade from 0-to-1 opacity
  */
  duration?: number
  /**
  *
  */
  delay?: number
  /**
  *
  */
  children
}