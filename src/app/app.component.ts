import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BotDirective, StyleSetDirective, AppService, ComService, Payload, DEFAULT_OPTIONS } from 'ngx-microsoft-bot-framework';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    providers: [AppService, ComService, BotDirective, StyleSetDirective],
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild("botWindow", { static: false }) botWindowElement: ElementRef;
    passViewChild: ViewChild;

    payload: Payload = {
      secret: 'VQDSUGBn3Lo.SxWHKP4UXAvJWZaLXkUQGBABH4sjZU3NIjeesJnmW-g',
      url: 'https://webchat.botframework.com/api/tokens',
      secretSetting: true
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
      text_content: {
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
      sendBoxBorderTop: 'solid 0px #E6E6E6',
    };
    error: any;

    constructor(
      private http: HttpClient,
      private appService: AppService,
      private comService: ComService,
      private bot: BotDirective
    ) {
      comService.secretToken$.subscribe(
      secret => {
        console.log('astronaut ', secret)
      }); 
    }

    setBotDirective(): void {
      this.passViewChild = this.botWindowElement.nativeElement;
      this.bot.botDirective(this.passViewChild);
    }
    
    public ngOnInit(): void {
      // console.log('init dynamic 1', this.botWindowElement); // undefined
       
      //this.showConfigResponse();
      // this.getHeroes();
      this.obtainStylePayload();
      this.obtainLocalToken();

    }

    public ngAfterViewInit(): void {
      console.log('MAIN COMPONENT ', this.botWindowElement.nativeElement);
      //console.log('init dynamicdd 2', this.botWindowElement); // undefined
      // this.getHeroes();
      this.setBotDirective();
      // this.makeError();
    }

    obtainLocalToken() {
      this.comService.obtainToken(this.payload);
    }

    obtainStylePayload() {
      this.comService.obtainStylePayload(this.stylesetPayload, this.styleOptionsPayload)
    }

    makeError() {
      this.appService.makeIntentionalError().subscribe(null, error => this.error = error );
    }

    
    
}
