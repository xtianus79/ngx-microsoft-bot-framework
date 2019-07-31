function fontFamily(fonts) {
  return fonts.map(font => `'${font}'`).join(', ');
}

export interface DEFAULT_OPTIONS {
  // Color and paddings
  accent?: string;
  backgroundColor?: string;
  cardEmphasisBackgroundColor?: string;
  paddingRegular?: any;
  paddingWide?: any;
  subtle?: string;

  // Word break
  messageActivityWordBreak?: string; // 'normal' || 'break-all' || 'break-word' || 'keep-all'

  // Fonts
  fontSizeSmall?: string;
  monospaceFont?: string;
  primaryFont?: string;

  // Avatar
  avatarSize?: any;
  botAvatarImage?: string;
  botAvatarInitials?: string;
  userAvatarImage?: string;
  userAvatarInitials?: string;

  // Bubble
  bubbleBackground?: string;
  bubbleBorderColor?: string;
  bubbleBorderRadius?: any;
  bubbleBorderStyle?: string;
  bubbleBorderWidth?: any;
  bubbleFromUserBackground?: string;
  bubbleFromUserBorderColor?: string;
  bubbleFromUserBorderRadius?: any;
  bubbleFromUserBorderStyle?: string;
  bubbleFromUserBorderWidth?: any;
  bubbleFromUserNubOffset?: string;
  bubbleFromUserNubSize?: any;
  bubbleFromUserTextColor?: string;
  bubbleImageHeight?: any;
  bubbleMaxWidth?: any; // screen width = 600px
  bubbleMinHeight?: any;
  bubbleMinWidth?: any; // min screen width = 300px, Edge requires 372px (https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/13621468/)
  bubbleNubOffset?: string;
  bubbleNubSize?: any;
  bubbleTextColor?: string;

  // Markdown
  markdownRespectCRLF?: boolean;

  // Rich Cards
  richCardWrapTitle?: boolean; // Applies to subtitles as well

  // Root
  rootHeight?: string;
  rootWidth?: string;

  // Send box
  hideSendBox?: boolean;
  hideUploadButton?: boolean;
  microphoneButtonColorOnDictate?: string;
  sendBoxBackground?: string;
  sendBoxButtonColor?: string;
  sendBoxButtonColorOnDisabled?: string;
  sendBoxButtonColorOnFocus?: string;
  sendBoxButtonColorOnHover?: string;
  sendBoxHeight?: any;
  sendBoxMaxHeight?: any;
  sendBoxTextColor?: string;
  sendBoxBorderBottom?: string;
  sendBoxBorderLeft?: string;
  sendBoxBorderRight?: string;
  sendBoxBorderTop?: string;
  sendBoxPlaceholderColor?: string;
  sendBoxTextWrap?: boolean;

  // Visually show spoken text
  showSpokenText?: boolean;

  // Suggested actions
  suggestedActionBackground?: string;
  suggestedActionBorder?: string;
  suggestedActionBorderRadius?: any;
  suggestedActionImageHeight?: any;
  // DEFAULT_ACCENT
  suggestedActionTextColor?: string;
  suggestedActionDisabledBackground?: string;
  suggestedActionDisabledBorder?: string;
  // DEFAULT_SUBTLE
  suggestedActionDisabledTextColor?: string;
  suggestedActionHeight?: any;

  // Timestamp
  timestampColor?: string;

  // Transcript overlay buttons (e.g. carousel and suggested action flippers, scroll to bottom, etc.)
  transcriptOverlayButtonBackground?: string;
  transcriptOverlayButtonBackgroundOnFocus?: string;
  transcriptOverlayButtonBackgroundOnHover?: string;
  transcriptOverlayButtonColor?: string;
  transcriptOverlayButtonColorOnFocus?: string;
  transcriptOverlayButtonColorOnHover?: string;

  // Video
  videoHeight?: any; // based on bubbleMaxWidth, 480 / 16 * 9 = 270

  // Connectivity UI
  // PADDING_REGULAR
  connectivityIconPadding?: any;
  // PADDING_REGULAR
  connectivityMarginLeftRight?: any;
  // PADDING_REGULAR
  connectivityMarginTopBottom?: any;
  connectivityTextSize?: any;
  failedConnectivity?: string;
  slowConnectivity?: string;
  notificationText?: string;

  typingAnimationBackgroundImage?: any;
  typingAnimationHeight?: any;
  typingAnimationWidth?: any;

  spinnerAnimationBackgroundImage?: any;
  spinnerAnimationHeight?: any;
  spinnerAnimationWidth?: any;
  spinnerAnimationPaddingRight?: any;

  // added properties for styling styleSet
  activties?: {};
  activity?: {};
  audioAttachment?: {};
  audioContent?: {};
  avatar?: {};
  bubble?: {};
  carouselFilmStrip?: {};
  carouselFlipper?: {};
  connectivityNotification?: {};
  dictationInterims?: {};
  downloadAttachment?: {};
  errorBox?: {};
  errorNotification?: {};
  microphoneButton?: {};
  root?: {};
  scrollToEndButton?: {};
  sendBox?: {};
  sendBoxButton?: {};
  sendBoxTextArea?: {};
  sendBoxTextBox?: {};
  sendStatus?: {};
  singleAttachmentActivity?: {};
  spinnerAnnimation?: {};
  stackedLayout?: {};
  suggestedAction?: {};
  suggestedActionsStyleSet?: {};
  textContent?: {};
  timestamp?: {};
  typingActivity?: {};
  uploadButton?: {};
  videoAttachment?: {};
  videoContent?: {};
  vimeoContent?: {};
  warningNotification?: {};
  youTubContent?: {};
};