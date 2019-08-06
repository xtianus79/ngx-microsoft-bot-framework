import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BotDirective } from './directives/bot.directive';
import { BotHelperDirective } from './directives/bot-helper.directive';
import { StyleSetDirective } from './directives/style-set.directive';
import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler }     from './services/http-error-handler.service';
import { MessageService }       from './services/message.service';


@NgModule({
  declarations: [
    BotDirective,
    BotHelperDirective,
    StyleSetDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    HttpErrorHandler,
    MessageService
  ]
})
export class NgxMicrosoftBotFrameworkModule { }
