/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props.
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { ViewStyle } from "react-native";
import { HeaderViewPresetNames } from "./header-view-presets";

export interface HeaderViewProps {
  /**
   * Items to be displayed in the menu
   */
  menuItems: {
    name: string,
    textColor?: string,
    borderColor?: string,
    onPress?: () => void,
    ref?: Element,
    render?: Element
  }[]
  /**
   * What to do when a menu item is pressed?
   */
  onPressMenuItem?: (name: string) => void
  /**
   * Are there any unread notifications?
   */
  unreadNotifications?: boolean
  /**
   * What to do when notification icon is pressed?
   */
  onPressNotifications?: () => void
  /**
   * Need a way to set active menu from screen (changes automatically when scrolling)
   */
  activeMenuItem?: string
  /**
   * What to do when active menu item changes?
   */
  onSelectMenuItem?: (string) => void
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  /**
  * Title to display.
  */
  title?: string
  /**
  * Preset being used.
  */
  preset?: HeaderViewPresetNames
  /**
   * Is header expanded?
   */
  opened?: boolean
  /**
   * Expand header
   */
  open?: () => void
  /**
   * Navigation object
   */
  navigation?: any
  /**
   * Elements to be added into the header view
   */
  children?: Element
  /**
   * What happens when setting button is pressed?
   */
  onPressSettingsDrawer?
  /**
   * What happens when notifications button is pressed?
   */
  hasNotificationsIcon?
  /**
   * Is there a cover image in the header?
   */
  coverImage?
  /**
   * Styles for container around menu items
   */
  menuItemContainerStyle?: ViewStyle
  /**
   *
   */
  menuItemStyle?: ViewStyle
  /**
   * Colors of linear gradient background for headerview
   * @example ['#72fa41, '#72FA41', '#1c1c1c']
   */
  headerColors?
  /**
   *
   */
  hasCancel?
  /**
   *
   */
  onPressCancel?
  /**
   * Show the back button? (default true)
   */
  hasBackButton: true
  /**
   *
   */
  onPressBack: () => void
  /**
   *
   */
  hasTitle?: boolean
  /**
   *
   */
  onSetHeaderHeight?: (height: number) => void
  /**
   *
   */
  headerChildren?: Element
}