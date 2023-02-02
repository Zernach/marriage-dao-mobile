/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props.
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { LinearGradientProps } from "expo-linear-gradient";
import { ViewStyle } from "react-native";
import { BaseHeaderViewPresetNames } from "./base-header-view-presets";

export interface BaseHeaderViewProps {
  /**
   * An optional style override useful for padding & margin
   */
  style?: ViewStyle
  /**
  * Preset being used
  */
  preset?: BaseHeaderViewPresetNames
  /**
   * Is it open?
   */
  opened?: boolean
  /**
   * What to do when open button pressed?
   */
  open: () => void
  /**
   * Custom element to show when it's closed
   */
  renderClosed?: Element
  /**
   * Configure the linear gradient
   */
  linearGradientProps?: LinearGradientProps
  /**
   * What to render inside header?
   */
  children: Element
}