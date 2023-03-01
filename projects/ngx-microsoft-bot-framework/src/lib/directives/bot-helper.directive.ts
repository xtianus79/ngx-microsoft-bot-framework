import { Directive, Query, ViewChild} from '@angular/core';

@Directive({
  selector: 'bot-helper'
})
export class BotHelperDirective {
  viewChild?: ViewChild;
  userId: string = 'USER_ID';

  /**
   * renderWebChat overloaded method(+3) to initiate renderWebChat object for bot construction
   * 2 - 6 parameters allow for a self constructed renderWebChat objects to a
   * 2 parameter self contained object will full access to the WebChat api
   * @viewChild is the only required parameter i
   * If not providing a @renderObject provide null in its place to skip over
   */
  public renderWebChat(viewChild: any, renderObject: any, directLine: any, userId: any, styleOptionsPayload: any, styleSet: any): void;
  public renderWebChat(viewChild: any, renderObject: {}, directLine: any, userId: any, styleOptionsPayload: any): void;
  public renderWebChat(viewChild: any, renderObject: {}, directLine: any, userId: string): void;
  public renderWebChat(viewChild: any, renderObject: {}): void;
  public renderWebChat(viewChild: Query | undefined, renderObject?: any, directLine?: any, userId?: string | undefined, styleOptionsPayload?: any, styleSet?: any): void {
    userId != undefined ? this.userId = userId : this.userId;
    if (styleOptionsPayload && styleSet) {
      window.WebChat.renderWebChat(
        {
          directLine: directLine,
          userID: this.userId,
          styleOptions: styleOptionsPayload,
          styleSet: styleSet
        },
        this.viewChild = viewChild
      );
    } else if (styleOptionsPayload && !styleSet)  {
      window.WebChat.renderWebChat(
        {
          directLine: directLine,
          userID: this.userId,
          styleOptions: styleOptionsPayload
        },
        this.viewChild = viewChild
      );
    } else if (styleSet && !styleOptionsPayload) {
      window.WebChat.renderWebChat(
        {
          directLine: directLine,
          userID: this.userId,
          styleSet: styleSet
        },
        this.viewChild = viewChild
      );
    } else if (renderObject) {
      window.WebChat.renderWebChat(
        renderObject,
        this.viewChild = viewChild
      );
    } else {
      window.WebChat.renderWebChat(
        {
          directLine: directLine,
          userId: this.userId
        }
      );
    }
  }
}
