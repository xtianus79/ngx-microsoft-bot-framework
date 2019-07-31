import { Directive, ViewChild } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { StyleSetDirective } from './style-set.directive';

import { AppService } from './app.service';
import { ComService } from './com.service';

import { DEFAULT_OPTIONS } from './default-options';
import { StyleSetProp } from './style-set';

/**
 * Declares the WebChat property on the window object.
 */
declare global {
    interface Window {
        WebChat: any;
    }
}

window.WebChat = window.WebChat || {};

@Directive({
    selector: 'app-bot',
    providers: [AppService, ComService]
})
export class BotDirective {
viewChild: ViewChild;
styleSet: StyleSetProp;
styleOptions: DEFAULT_OPTIONS;
secretSetting: boolean;
secret: string;
error: any;

  constructor(
    private styleSetDir: StyleSetDirective,
    private http: HttpClient,
    private appService: AppService,
    private comService: ComService
  ) {
    comService.secretToken$.subscribe(
    secret => {
      this.secretSetting = secret.secretSetting;
      this.secret = secret.secret;
    }); 
    comService.styleSet$.subscribe(
      response => {
        if (response != null || response != undefined) {
          // styleset set to property options for creatstyleset set from user
          this.styleSet = window.WebChat.createStyleSet(response);
          // stylesetdirective properties set to response from user
          this.styleSetDir.activities = response.activties;
          this.styleSetDir.activity = response.activity;
          this.styleSetDir.audioAttachment = response.audioAttachment;
          this.styleSetDir.audioContent = response.audioContent;
          this.styleSetDir.avatar = response.avatar;
          this.styleSetDir.bubble = response.bubble;
          this.styleSetDir.carouselFilmStrip = response.carouselFilmStrip;
          this.styleSetDir.carouselFlipper = response.carouselFlipper;
          this.styleSetDir.connectivityNotification = response.connectivityNotification;
          this.styleSetDir.dictationInterims = response.dictationInterims;
          this.styleSetDir.downloadAttachment = response.downloadAttachment;
          this.styleSetDir.errorBox = response.errorBox;
          this.styleSetDir.errorNotification = response.errorNotification;
          this.styleSetDir.microphoneButton = response.microphoneButton;
          this.styleSetDir.root = response.root;
          this.styleSetDir.scrollToEndButton = response.scrollToEndButton;
          this.styleSetDir.sendBox = response.sendBox;
          this.styleSetDir.sendBoxButton = response.sendBoxButton;
          this.styleSetDir.sendBoxTextArea = response.sendBoxTextArea;
          this.styleSetDir.sendBoxTextBox = response.sendBoxTextBox;
          this.styleSetDir.sendStatus = response.sendStatus;
          this.styleSetDir.singleAttachmentActivity = response.singleAttachmentActivity;
          this.styleSetDir.spinnerAnnimation = response.spinnerAnnimation;
          this.styleSetDir.stackedLayout = response.stackedLayout;
          this.styleSetDir.suggestedAction = response.suggestedAction;
          this.styleSetDir.suggestedActionsStyleSet = response.suggestedActionsStyleSet;
          this.styleSetDir.textContent = response.textContent;
          this.styleSetDir.timestamp = response.timestamp;
          this.styleSetDir.typingActivity = response.typingActivity;
          this.styleSetDir.uploadButton = response.uploadButton;
          this.styleSetDir.videoAttachment = response.videoAttachment;
          this.styleSetDir.videoContent = response.videoContent;
          this.styleSetDir.vimeoContent = response.vimeoContent;
          this.styleSetDir.warningNotification = response.warningNotification;
          this.styleSetDir.youTubeContent = response.youTubContent;
        }
      });
    comService.styleOptions$.subscribe(
      response => {
        if (response !== null || response !== undefined) {
          this.styleOptions = response;
        }
      }
    )
  }

  botDirective(viewChild): void {
    this.viewChild = viewChild;
    let token: string;
    this.appService.getTokenObs()
      .subscribe(
        response => {            
          this.secretSetting ? token = response.body : token = this.secret;
          if (response.status == 200 && response.statusText == 'OK' || response == false) {
            const directLine = window.WebChat.createDirectLine({
                secret: token,
                webSocket: false
            });
            if (this.styleSet && this.styleOptions) {
              window.WebChat.renderWebChat(
                  {
                      directLine: directLine,
                      userID: "USER_ID",
                      styleOptions: this.styleOptions,
                      styleSet: this.styleSet
                  },
                  this.viewChild
              );
            } else if (this.styleSet && !this.styleOptions) {
              window.WebChat.renderWebChat(
                  {
                      directLine: directLine,
                      userID: "USER_ID",
                      styleSet: this.styleSet
                  },
                  this.viewChild
              );
            } 
            else if (this.styleOptions && !this.styleSet) {
              window.WebChat.renderWebChat(
                  {
                      directLine: directLine,
                      userID: "USER_ID",
                      styleOptions: this.styleOptions,
                  },
                  this.viewChild
              );
            } else {
              window.WebChat.renderWebChat(
                  {
                      directLine: directLine,
                      userID: "USER_ID",
                  },
                  this.viewChild
              );
            }
            directLine
                .postActivity({
                    from: { id: "USER_ID", name: "USER_NAME" },
                    name: "requestWelcomeDialog",
                    type: "event",
                    value: "token"
                })
                .subscribe(
                    id => console.log(`Posted activity, assigned ID ${id}`),
                    error => console.log(`Error posting activity ${error}`)
                );
          }
          if (this.styleSet != null || this.styleSet != undefined) {
            this.styleSet.activities = this.styleSetDir.Activities(this.styleSet.activities, this.styleSetDir.activities);
            this.styleSet.activity = this.styleSetDir.Activity(this.styleSet.activity, this.styleSetDir.activity);
            this.styleSet.audioAttachment = this.styleSetDir.AudioAttachment(this.styleSet.audioAttachment, this.styleSetDir.audioAttachment);
            this.styleSet.audioContent = this.styleSetDir.AudioContent(this.styleSet.audioContent, this.styleSetDir.audioContent);
            this.styleSet.avatar = this.styleSetDir.Avatar(this.styleSet.avatar, this.styleSetDir.avatar);
            this.styleSet.bubble = this.styleSetDir.Bubble(this.styleSet.bubble, this.styleSetDir.bubble);
            this.styleSet.carouselFilmStrip = this.styleSetDir.CarouselFilmStrip(this.styleSet.carouselFilmStrip, this.styleSetDir.carouselFilmStrip);
            this.styleSet.carouselFlipper = this.styleSetDir.CarouselFlipper(this.styleSet.carouselFlipper, this.styleSetDir.carouselFlipper);
            this.styleSet.connectivityNotification = this.styleSetDir.ConnectivityNotification(this.styleSet.connectivityNotification, this.styleSetDir.connectivityNotification);
            this.styleSet.dictationInterims = this.styleSetDir.DictationInterims(this.styleSet.dictationInterims, this.styleSetDir.dictationInterims);
            this.styleSet.downloadAttachment = this.styleSetDir.DownloadAttachment(this.styleSet.downloadAttachment, this.styleSetDir.downloadAttachment);
            this.styleSet.errorBox = this.styleSetDir.ErrorBox(this.styleSet.errorBox, this.styleSetDir.errorBox);
            this.styleSet.errorNotification = this.styleSetDir.ErrorNotification(this.styleSet.errorNotification, this.styleSetDir.errorNotification);
            this.styleSet.microphoneButton = this.styleSetDir.MicrophoneButton(this.styleSet.microphoneButton, this.styleSetDir.microphoneButton);
            this.styleSet.root = this.styleSetDir.Root(this.styleSet.root, this.styleSetDir.root);
            this.styleSet.scrollToEndButton = this.styleSetDir.ScrollToEndButton(this.styleSet.scrollToEndButton, this.styleSetDir.scrollToEndButton);
            this.styleSet.sendBox = this.styleSetDir.SendBox(this.styleSet.sendBox, this.styleSetDir.sendBox);
            this.styleSet.sendBoxButton = this.styleSetDir.SendBoxButton(this.styleSet.sendBoxButton, this.styleSetDir.sendBoxButton);
            this.styleSet.sendBoxTextArea = this.styleSetDir.SendBoxTextArea(this.styleSet.sendBoxTextArea, this.styleSetDir.sendBoxTextArea);
            this.styleSet.sendBoxTextBox = this.styleSetDir.SendBoxTextBox(this.styleSet.sendBoxTextBox, this.styleSetDir.sendBoxTextBox);
            this.styleSet.sendStatus = this.styleSetDir.SendStatus(this.styleSet.sendStatus, this.styleSetDir.sendStatus);
            this.styleSet.singleAttachmentActivity = this.styleSetDir.SingleAttachmentActivity(this.styleSet.singleAttachmentActivity, this.styleSetDir.singleAttachmentActivity);
            this.styleSet.spinnerAnnimation = this.styleSetDir.SpinnerAnimation(this.styleSet.spinnerAnnimation, this.styleSetDir.spinnerAnnimation);
            this.styleSet.stackedLayout = this.styleSetDir.StackedLayout(this.styleSet.stackedLayout, this.styleSetDir.stackedLayout);
            this.styleSet.suggestedAction = this.styleSetDir.SuggestedAction(this.styleSet.suggestedAction, this.styleSetDir.suggestedAction);
            this.styleSet.suggestedActionsStyleSet = this.styleSetDir.SuggestedActionsStyleSet(this.styleSet.suggestedActionsStyleSet, this.styleSetDir.suggestedActionsStyleSet);
            this.styleSet.textContent = this.styleSetDir.TextContent(this.styleSet.textContent, this.styleSetDir.textContent);
            this.styleSet.timestamp = this.styleSetDir.Timestamp(this.styleSet.timestamp, this.styleSetDir.timestamp);
            this.styleSet.typingActivity = this.styleSetDir.TypingActivity(this.styleSet.typingActivity, this.styleSetDir.typingActivity);
            this.styleSet.typingAnimation = this.styleSetDir.TypingAnimation(this.styleSet.typingAnimation, this.styleSetDir.typingAnimation);
            this.styleSet.uploadButton = this.styleSetDir.UploadButton(this.styleSet.uploadButton, this.styleSetDir.uploadButton);
            this.styleSet.videoAttachment = this.styleSetDir.VideoAttachment(this.styleSet.videoAttachment, this.styleSetDir.videoAttachment);
            this.styleSet.videoContent = this.styleSetDir.VideoContent(this.styleSet.videoContent, this.styleSetDir.videoContent);
            this.styleSet.vimeoContent = this.styleSetDir.VimeoContent(this.styleSet.vimeoContent, this.styleSetDir.vimeoContent);
            this.styleSet.warningNotification = this.styleSetDir.WarningNotification(this.styleSet.warningNotification, this.styleSetDir.warningNotification);
            this.styleSet.youTubeContent = this.styleSetDir.YouTubeContent(this.styleSet.youTubeContent, this.styleSetDir.youTubeContent);
          }
        }
      );
  }
  makeError() {
    this.appService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}