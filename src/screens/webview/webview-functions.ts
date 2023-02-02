import { useCallback, useRef, useState } from "react"
import { Alert, Share } from "react-native"

/*
* This is where screen-level functions are gathered & organized.
* Please write a concise JSDoc explanation :)
*/
const useWebviewFunctions = (navigation: any, link: string) => {

  const webviewRef = useRef()
  const [typedLink, setTypedLink] = useState(link)
  const [weblink, setWeblink] = useState(link)
  const [isWebviewLoading, setIsWebviewLoading] = useState(false)

  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const onPressBackToPreviousWebsite = useCallback(() => {
    webviewRef?.current?.goBack?.()
  }, [])

  const onPressForwardToNextWebsite = useCallback(() => {
    webviewRef?.current?.goForward?.()
  }, [])

  const onNavigateToAnotherWebsiteWithinWebview = useCallback(
    (props: any) => {
      setWeblink?.(props.url)
      setTypedLink?.(props.url)
    },
    [setWeblink, setTypedLink],
  )

  const onPressShareWebsite = useCallback(() => {
    Share.share({ message: weblink });
  }, [weblink])

  const onPressWebviewStatus = useCallback(() => {
    let popupTitle = 'Safe, Secure, & Private Website Connection'
    if (isWebviewLoading) {
      popupTitle = 'Website is loading...'
    }
    Alert.alert(popupTitle)
  }, [isWebviewLoading])

  const onSubmitEditing = useCallback(() => {
    if (!typedLink) {
      setTypedLink?.(weblink)
    } else {
      setWeblink?.(typedLink || '')
    }
  }, [typedLink, weblink])

  return {
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
  }
}

export { useWebviewFunctions }