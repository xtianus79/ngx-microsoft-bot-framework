import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppService } from './app.service';
import { ComService } from './com.service';
import { Observable } from 'rxjs';

import { Payload } from './bot-payload';
import { DEFAULT_OPTIONS } from './default-options';
import { StyleSetObj, StyleSetProp, StyleSetObjReturn } from './style-set';

@Directive({
  selector: 'app-style-set',
  providers: [AppService, ComService]
})
export class StyleSetDirective implements OnInit, AfterViewInit, StyleSetProp, StyleSetObj { 
  activities: StyleSetProp;
  activity: StyleSetProp;
  audioAttachment: StyleSetProp;
  audioContent: StyleSetProp;
  avatar: StyleSetProp;
  bubble: StyleSetProp;
  carouselFilmStrip: StyleSetProp;
  carouselFlipper: StyleSetProp;
  connectivityNotification: StyleSetProp;
  dictationInterims: StyleSetProp;
  downloadAttachment: StyleSetProp;
  errorBox: StyleSetProp;
  errorNotification: StyleSetProp;
  microphoneButton: StyleSetProp;
  root: StyleSetProp;
  scrollToEndButton: StyleSetProp;
  sendBox: StyleSetProp;
  sendBoxButton: StyleSetProp;
  sendBoxTextArea: StyleSetProp;
  sendBoxTextBox: StyleSetProp;
  sendStatus: StyleSetProp;
  singleAttachmentActivity: StyleSetProp;
  spinnerAnnimation: StyleSetProp;
  stackedLayout: StyleSetProp;
  suggestedAction: StyleSetProp;
  suggestedActionsStyleSet: StyleSetProp;
  textContent: StyleSetProp;
  timestamp: StyleSetProp;
  typingActivity: StyleSetProp;
  typingAnimation: StyleSetProp;
  uploadButton: StyleSetProp;
  videoAttachment: StyleSetProp;
  videoContent: StyleSetProp;
  vimeoContent: StyleSetProp;
  warningNotification: StyleSetProp;
  youTubeContent: StyleSetProp;
 
  // constructor(
  //   private http: HttpClient,
  //   private appService: AppService,
  //   private comService: ComService
  // ) {
  // }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {

  }

  Activities(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  Activity(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  AudioAttachment(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  AudioContent(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  Avatar(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  Bubble(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  CarouselFilmStrip(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  CarouselFlipper(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  ConnectivityNotification(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  DictationInterims(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  DownloadAttachment(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  ErrorBox(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  ErrorNotification(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  MicrophoneButton(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  Root(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  ScrollToEndButton(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SendBox(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SendBoxButton(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SendBoxTextArea(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SendBoxTextBox(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SendStatus(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SingleAttachmentActivity(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SpinnerAnimation(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  StackedLayout(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SuggestedAction(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SuggestedActions(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  SuggestedActionsStyleSet(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  TextContent(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  Timestamp(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  TypingActivity(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  TypingAnimation(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  UploadButton(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  VideoAttachment(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  VideoContent(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  VimeoContent(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  WarningNotification(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
  YouTubeContent(a: StyleSetProp , b: StyleSetObjReturn) {
    return a = Object.assign({}, a, b);
  }
}