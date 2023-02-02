/*
 * Your component must have a TypeScript interface. Use this file to create it
 * Don't forget to add a brief JSDoc comment above all props.
 * Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
 */
import { HeaderViewProps } from "../header-view/header-view-interface";
import { HomeHeaderViewProps } from "../home-header-view/home-header-view-interface";

export interface ScreenProps extends HeaderViewProps {
  /**
   * Children to render
   */
  children?: Element;
  /**
   * Body Children to render
   */
  bodyChildren?: Element;
  /**
   *
   */
  onEndReached?: () => void;
  /**
   *
   */
  onEndReachedThreshold?: number;
  /**
   * Children elements to display in the header
   */
  headerChildren?: Element;
  /**
   *
   */
  onPressNav?;
  /**
   *
   */
  following?: boolean;
  /**
   *
   */
  toggleFavoriteUser?;
  /**
   *
   */
  collapseHeaderEnabled?;
  /**
   *
   */
  inWatchlist?: boolean;
  /**
   *
   */
  hasNotificationsIcon?: boolean;
  /**
   *
   */
  onPressWatchlist?;
  /**
   *
   */
  onPressOpen?;
  /**
   *
   */
  scrollViewProps?;
  /**
   *
   */
  user?: {
    /**
     *
     */
    profile_image_url?: string;
    /**
     *
     */
    bio?: string;
    /**
     *
     */
    email?: string;
    /**
     *
     */
    username?: string;
    /**
     *
     */
    id?: string;
    /**
     * Background color of the user's profile
     * @example "#72FA41"
     */
    profile_primary_color?: string;
  };
  /**
   *
   */
  isHomeView?: boolean;
  /**
   *
   */
  setCurrentOpenView?: (string) => void;
  /**
   *
   */
  hasCancel?: boolean;
  /**
   *
   */
  onPressCancel?;
  /**
   *
   */
  onPressInviteFriend?: () => void;
  /**
   *
   */
  onPressNotifications?: () => void;
  /**
   *
   */
  hasNavbar?: boolean;
  /**
   * What screen is currently active?
   */
  currentScreen?: string;
  /**
   *
   */
  hasScrollViewEnabled?: boolean;
  /**
   *
   */
  hasFloatingButton?: boolean;
  /**
   *
   */
  floatingButtonText?: string;
  /**
   *
   */
  onPressFloatingButton?: () => void;
  /**
   *
   */
  floatingButtonTextColor?: string;
  /**
   *
   */
  floatingButtonColors?: string[];
  /**
   *
   */
  floatingButtonShadowColor?: string;
  /**
   *
   */
  hasSolidFloatingButton?: boolean;
  /**
   *
   */
  setUser?: (user: any) => void;
  /**
   *
   */
  isShareTypeSelectionOpen?: boolean;
  /**
   *
   */
  updateShareType?: (shareType: string) => void;
  /**
   *
   */
  shareType?: string;
  /**
   *
   */
  newlyTypedBio?: string;
  /**
   *
   */
  setNewlyTypedBio?: (newlyTypedBio: string) => void;
  /**
   *
   */
  showingSeeMoreBio?: boolean;
  /**
   *
   */
  setShowingSeeMoreBio?: (showingSeeMoreBio: boolean) => void;
  /**
   *
   */
  manualScrollToTop?: boolean;
  /**
   *
   */
  manualScrollToBottom?: boolean;
  bioExpanded?: boolean;
  setBioExpanded?: () => void;
  scrollViewRef?: any;
  onScroll?: any;
  title?: string;
  isCurrentUser?: boolean;
  editBio?: (string) => void;
  userProfileView?: any;
  onPressPersonalProfile?: () => void;
  footerChildren?: any;
  hasTitle?: boolean;
  hasScrollView?: boolean;
  oneOnOneChannelId?: string;
  scrollToEnd?: () => void;
  scrollToTop?: () => void;
  hasBackButton?: boolean;
  onPressBack?: () => void;
  confettiCannonRef?: any;
  onPressUserProfileImage?: () => void;
  onPressProfileImageWhenViewingSelf?: () => void;
}