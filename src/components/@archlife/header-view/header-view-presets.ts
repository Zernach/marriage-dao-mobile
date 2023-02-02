/*
* Some Components need to render in unique ways in some screens
* Presets help us reuse most of the component while creating unique variations of it
* Use this file to create your own presets, where needed.
* Remember! NOT ALL COMPONENTS NEED PRESET. This file is here to help you, so don't feel like you need to use it!
*/
import { TextStyle } from "react-native";

export const HeaderViewPresets = {
  default: {
    textStyles: {
      color: 'black'
    } as TextStyle
  },
  secondary: {
    textStyles: {
      color: 'blue'
    } as TextStyle
  }
}
export type HeaderViewPresetNames =  keyof typeof HeaderViewPresets