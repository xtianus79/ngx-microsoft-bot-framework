import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BotDirective } from './bot.directive';
import { StyleSetDirective } from './style-set.directive';
import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';


@NgModule({
  declarations: [
    BotDirective,
    StyleSetDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [
    HttpErrorHandler,
    MessageService,
  ]
})
export class NgxMicrosoftBotFrameworkModule { }
