import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {
  BotDirective,
  BotHelperDirective,
  BotService,
  ComService,
  DEFAULT_OPTIONS,
  IPayload,
  IWebChat,
  StyleSetDirective
} from 'ngx-microsoft-bot-framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [BotService, ComService, BotDirective, BotHelperDirective, StyleSetDirective],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('botWindow', {static: false}) botWindowElement?: ElementRef;
  passViewChild?: ViewChild;
  renderObject?: IWebChat;

  payload: IPayload = {
    secret: 'VQDSUGBn3Lo.SxWHKP4UXAvJWZaLXkUQGBABH4sjZU3NIjeesJnmW-g',
    url: 'https://webchat.botframework.com/api/tokens',
    secretSetting: true,
    userId: 'USER_ID',
    webSocket: true
  };
  stylesetPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'BF',
    userAvatarInitials: 'CH',
    backgroundColor: '#131313',
    bubbleBackground: '#353535',
    bubbleBorderWidth: 0,
    bubbleBorderStyle: 'none',
    bubbleFromUserBorderWidth: 5,
    bubbleBorderColor: 'green',
    bubbleBorderRadius: '1px 25px 25px 25px',
    bubbleFromUserBorderColor: 'black',
    bubbleFromUserTextColor: 'white',
    bubbleTextColor: 'white',
    sendBoxTextColor: 'white',
    bubbleFromUserBackground: '#353535',
    sendBoxBackground: '#131313',
    sendBoxBorderTop: 'solid 0px #E6E6E6',
    root: {

      /* width */
      ' ::-webkit-scrollbar': {
        width: '3px'
      },

      /* Track */
      ' ::-webkit-scrollbar-track': {
        background: '#131313'
      },

      /* Handle */
      ' ::-webkit-scrollbar-thumb': {
        background: '#353535'
      },

      /* Handle on hover */
      ' ::-webkit-scrollbar-thumb:hover': {
        background: 'red'
      }
    },
    textContent: {
      // fontFamily: '\'Comic Sans MS\', \'Arial\', sans-serif',
      // fontWeight: 'bold',
      cursor: 'crosshair',
      color: 'white'
    }
  };
  styleOptionsPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'BF',
    userAvatarInitials: 'CH',
    backgroundColor: 'red',
    bubbleBackground: '#353535',
    bubbleBorderWidth: 0,
    bubbleBorderStyle: 'none',
    bubbleFromUserBorderWidth: 5,
    bubbleBorderColor: 'green',
    bubbleBorderRadius: '1px 25px 25px 25px',
    bubbleFromUserBorderColor: 'black',
    bubbleFromUserTextColor: 'white',
    bubbleTextColor: 'white',
    sendBoxTextColor: 'white',
    bubbleFromUserBackground: '#353535',
    sendBoxBackground: '#131313',
    sendBoxBorderTop: 'solid 0px #E6E6E6'
  };
  error: any;

  constructor(
    private botService: BotService,
    private comService: ComService,
    private bot: BotDirective,
    private botHelper: BotHelperDirective
  ) {
  }

  public ngOnInit(): void {
    this.obtainStylePayload();
    this.obtainLocalToken();
  }

  public ngAfterViewInit(): void {
    // this.setBotDirective();
    this.customBotDirective();
  }

  customBotDirective(): void {
    let token: string;
    this.passViewChild = this.botWindowElement?.nativeElement;
    this.botService.getTokenObs()
      .subscribe(
        response => {
          this.payload.secretSetting ? token = response.body : token = this.payload.secret;
          if (response.status == 200 && response.statusText == 'OK' || response == false) {
            const directLine = window.WebChat.createDirectLine({
              secret: token,
              webSocket: this.payload.webSocket
            });

            const styleSet = window.WebChat.createStyleSet(this.stylesetPayload);

            let userId = 'USER_ID';
            this.renderObject = {
              directLine: directLine,
              userID: 'USER_ID',
              styleOptions: this.styleOptionsPayload,
              styleSet: styleSet,
              disabled: false
            };
            // this.bot.renderWebChat(this.passViewChild, null, directLine, userId, this.styleOptionsPayload, styleSet);

            this.botHelper.renderWebChat(this.passViewChild, this.renderObject);

            directLine
              .postActivity({
                from: {id: 'USER_ID', name: 'USER_NAME'},
                name: 'requestWelcomeDialog',
                type: 'event',
                value: 'token'
              })
              .subscribe(
                  (id: any) => console.log(`Posted activity, assirgned ID ${id}`),
                  (error: any) => console.log(`Error posting activity ${error}`)
              );

            styleSet.textContent = Object.assign(
              {},
              styleSet.textContent,
              {
                cursor: 'crosshair',
                color: 'white'
              }
            );
            styleSet.root = Object.assign(
              {},
              styleSet.root,
              {
                /* width */
                ' ::-webkit-scrollbar': {
                  width: '3px'
                },

                /* Track */
                ' ::-webkit-scrollbar-track': {
                  background: '#131313'
                },

                /* Handle */
                ' ::-webkit-scrollbar-thumb': {
                  background: '#353535'
                },

                /* Handle on hover */
                ' ::-webkit-scrollbar-thumb:hover': {
                  background: 'red'
                }
              }
            );
          }
        });
  }

  setBotDirective(): void {
    this.passViewChild = this.botWindowElement?.nativeElement;
    this.bot.botDirective(this.passViewChild);
  }

  obtainLocalToken() {
    this.comService.obtainToken(this.payload);
  }

  obtainStylePayload() {
    this.comService.obtainStylePayload(this.styleOptionsPayload, this.stylesetPayload);
  }

  makeError() {
    this.botService.makeIntentionalError().subscribe({error: (error: any) => this.error = error});
  }


}
