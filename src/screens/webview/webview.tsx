/*
* This file is responsible for exporting your screen file to the app's navigation.
* All functions should be defined in webview-functions so they can be exported & tested!
* All presentation JSX should be defined in webview-presentation to keep this file clean.
*/

import * as React from "react"
import { Presentation } from "./webview-presentation"
import { WebviewProps } from "./webview-interface"
import { useWebviewFunctions } from "./webview-functions"

export const Webview = (props: WebviewProps) => {

  const { navigation, route } = props
  const { params } = route

  const {
    link,
    title,
    onPressBackOverride
  } = params

  const {
    onPressBack,
    webviewRef,
    weblink,
    setWeblink,
    typedLink,
    setTypedLink,
    onNavigateToAnotherWebsiteWithinWebview,
    onPressBackToPreviousWebsite,
    onPressForwardToNextWebsite,
    isWebviewLoading,
    setIsWebviewLoading,
    onPressShareWebsite,
    onPressWebviewStatus,
    onSubmitEditing,
  } = useWebviewFunctions(navigation, link)

  return (
    <Presentation
      onPressBack={onPressBack}
      link={link}
      title={title}
      onPressShareWebsite={onPressShareWebsite}
      webviewRef={webviewRef}
      weblink={weblink}
      setWeblink={setWeblink}
      typedLink={typedLink}
      setTypedLink={setTypedLink}
      onNavigateToAnotherWebsiteWithinWebview={onNavigateToAnotherWebsiteWithinWebview}
      onPressBackOverride={onPressBackOverride}
      isWebviewLoading={isWebviewLoading}
      setIsWebviewLoading={setIsWebviewLoading}
      onPressBackToPreviousWebsite={onPressBackToPreviousWebsite}
      onPressForwardToNextWebsite={onPressForwardToNextWebsite}
      onPressWebviewStatus={onPressWebviewStatus}
      onSubmitEditing={onSubmitEditing}
    />
  )
}
