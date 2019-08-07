/**
 * Webchat api as per bot-framework documentation
 * https://github.com/microsoft/BotFramework-WebChat
 */
export interface IWebChat {
    activityMiddleware?: any;
    activityRenderer?: any;
    adaptiveCardHostConfig?: {};
    attachmentMiddleware?: any;
    attachmentRenderer?: any;
    cardActionMiddleware?: any;
    createDirectLine?: {};
    createStore?: any;
    directLine?: {};
    disabled?: boolean;
    grammars?: any;
    groupTimeStamp?: any;
    locale?: any;
    renderMarkdown?: any;
    sendTypingIndicator?: any;
    store?: any;
    styleOptions?: {};
    styleSet?: {};
    userID?: string;
    username?: string;
    webSpeechPonyFillFactory?: {};
  }