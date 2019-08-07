# ngx-microsoft-bot-framework
[Why ngx-microsoftbot-framework?](#why-ngx-microsoft-bot-framework?) | [Table of Contents](#table-of-contents) | [Installation](#installation) | [Advanced Installation](#advanced-installation)

<div>
    <a href="https://badge.fury.io/js/ngx-microsoft-bot-framework"><img src="https://badge.fury.io/js/ngx-microsoft-bot-framework.svg" alt="npm version" height="18"></a>
    <a href="https://npmjs.org/ngx-microsoft-bot-framework"><img alt="npm" src="https://img.shields.io/npm/dm/ngx-microsoft-bot-framework?color=blue&style=flat-square" alt="npm downloads"></a>
    <a href="https://david-dm.org/xtianus79/ngx-microsoft-bot-framework"><img alt="npm" src="https://david-dm.org/xtianus79/ngx-microsoft-bot-framework.svg" alt="npm dependencies"></a>
</div>

<a target="_blank" href="https://github.com/xtianus79/ngx-microsoft-bot-framework"><img src="https://i.imgur.com/UZVFXHS.png"/></a>

# Why ngx-microsoft-bot-framework?
This Angular library achieves 3 goals

1. Easy setup to render a Web Chat bot in your Angular application including providing the secret webchat key for the bot application. You can use a web call for a temporary token or directly use your secret key.
2. It allows you to add 2 styling guidelines for your microsoft chat bots

    2a. The **Recommended** styling model from Microsoft is the "Branding Webchat Styling." This is achieved via styleSetOptions. This has limited style set options that adhere to a predefined property set of mutable styles. More information can be found here: 
    [Branding WebChat Styling.](https://github.com/microsoft/BotFramework-WebChat/tree/master/samples/05.a.branding-webchat-styling)

    2b. The **Other alternative** to styling the chat bot is the "Idiosyncratic Manual Styling." This is acheived via createStyleSet. This has full access to the webchat dependency for styling specific property methods. More information can be found here: 
    [Idiosyncratic Manual Styling.](https://github.com/microsoft/BotFramework-WebChat/tree/master/samples/05.b.idiosyncratic-manual-styling)
  3. Provide flexability of using either the WebChat library directly via the `BotHelperDirective.renderWebChat()` method in an app component or by using the provided feature set of the `botDirective()` to initiate the webchat bot. Either method uses the `BotService` to pass the secret key either directly in the app or through the bot-framework api to recieve and use a temporary token which is recommended.
    

You can add a one or both objects to achieve your styling goals. From my testing you may have to use both styles because the base properties are not the same across methods. Text color is achieved in styleSetOptions but not used in createStyleSet.  So while createStyleSet allows you to use custom objects i.e. root you will need the other payload to achieve text styling.  Hopefully, Microsoft works this out in future updates.  

### My recommended styling option:
If you want complete custom styling to a granular level then I would use both payloads with that exact same base options along with the createStyleSet payload of custom styling objects. I will give specific examples below. *Make sure to read the bot documentation for a full understanding of each styling pattern.* 

## Table of contents
1. [Before We Begin](#before-we-begin)
2. [Installation](#installation)
3. [Advanced Installation](#advanced-installation)
4. [Bot Demo](#bot-demo)
5. [API](#api)
6. [Compatibility](#compatibility)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contribution)

## Before We Begin
First, read over the documentation about the <a href="https://github.com/microsoft/BotFramework-WebChat" target="_blank">Bot Framework Web Chat</a> api. 

> This repository contains code for the Bot Framework Web Chat component. The Bot Framework Web Chat component is a highly-customizable web-based client for the Bot Framework V4 SDK. The Bot Framework SDK v4 enables developers to model conversation and build sophisticated bot applications.

***Warning*** The information can be a lot to take in at first.  And the npm install botframework-webchat referred to in the documentation is specifically built for React. Hence, why I built this repo specifically for Angular.

The good news is the core of the Web Chat api is on a URL called <a href="https://github.com/microsoft/BotFramework-WebChat/blob/master/samples/01.a.getting-started-full-bundle/README.md" target="_blank">Web Chat CDN</a>

Next, Well you're going to need a bot! So where do we get one of these awesome bots? Create and learn about the Microsoft Bot Framework over at the <a href="https://azure.microsoft.com/en-us/services/bot-service" target="_blank">Azure Bot Service.</a> Here you can create a bot and obtain a secret key for the Web Chat setup. 

To be clear, we will be implementing the cdn inside of the Angular applications index.html file. The URL gives the latest Web Chat library.
```javascript
<script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
```

ngx-microsoft-botframework does not contain any core build files. It uses the directline api which among many things renders the Web Chat client. My main objective is to allow you to use the api fully

## Installation

##### Scenario 1
Install `ngx-microsoft-bot-framework` via `npm`:
```bash
npm i ngx-microsoft-bot-framework --save
```

##### Scenario 2
Use the Angular-Cli ng add command to update the Angular project:
```bash
ng add ngx-microsoft-bot-framework
```

##### Continuing...

Add module to NgModule imports:
```javascript
<!--- app.component.module -->
import { NgxMicrosoftBotFrameworkModule } from 'ngx-microsoft-bot-framework';
@NgModule({
  ...
  imports: [NgxMicrosoftBotFrameworkModule, ...]
  ...
})
```

Import all of these interfaces, classes and life-cycle hooks into the component bot will render:
```javascript
<!--- app.component.ts -->
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from "@angular/core";
```
Import the `ngx-microsoft-bot-framework` module and it's directives, services and interfaces: 
##### Note: Depending on your webchat implementation you may only wish to use the `BotDirective` or the `BotHelperDirective`
```javascript
import { BotDirective, BotHelperDirective, StyleSetDirective, BotService, ComService, IPayload, DEFAULT_OPTIONS } from 'ngx-microsoft-bot-framework';
```
Add these 2 properties
```javascript
@ViewChild("botWindow", { static: false }) botWindowElement: ElementRef;
passViewChild: ViewChild;
```

Add the default `Payload` property:
The false setting for `secretSetting` disables the web call to the botframework/api/token generator so the url is not neccessary:
##### Note: The url is optional if the `secretSetting` is set to false | `userId` and `webSocket` are optional settings
```javascript
payload: IPayload = {
    secret: 'VQDSUGBn3Lo.SxWHKP4UXAvJWZaLXkUQGBABH4sjZU3NIjeesJnmW-g',
    url: 'https://webchat.botframework.com/api/tokens',
    secretSetting: true,
    userId: 'USER_ID',
    webSocket: true
};
```
Optional: Styling the bot with 1 or 2 payloads is optional

Add the `styleSetOptions` and or `createStyleSet` payload properties:

##### Click on the typing i.e. `DEFAULT_OPTIONS` to see all of the possible property settings
```javascript
stylesetPayload: DEFAULT_OPTIONS = {
      rootHeight: '100%',
      botAvatarInitials: 'BF',
      userAvatarInitials: 'CH',
      backgroundColor: '#131313',
      ...
      root: {
        /* width */
        ' ::-webkit-scrollbar': {
          width: '3px'
        },
        ...
      },
      text_content: {
        fontFamily: '\'Comic Sans MS\', \'Arial\', sans-serif',
        fontWeight: 'bold',
        ...
      }
    };
    styleOptionsPayload: DEFAULT_OPTIONS = {
      rootHeight: '100%',
      botAvatarInitials: 'BF',
      userAvatarInitials: 'CH',
      backgroundColor: 'red',
      ...
    };
```
Add the communicatoin services and bot directive to the constructor:
```javascript
constructor(
    private comService: ComService,
    private bot: BotDirective
) { }
```
Add the methods that will be called into the `ngOnInit()` and `ngAfterViewInit()` life-cylce hooks:
```javascript
setBotDirective(): void {
    this.passViewChild = this.botWindowElement.nativeElement;
    this.bot.botDirective(this.passViewChild);
}

obtainLocalToken() {
    this.comService.obtainToken(this.payload);
}

obtainStylePayload() {
    this.comService.obtainStylePayload(this.stylesetPayload, this.styleOptionsPayload)
}
```
Call the methods in the 2 life-cycle hooks. `ngAfterViewInit()` is used because of the Angular 8/9 `ViewChild` [documentation](https://angular.io/api/core/ViewChild#description) stating ViewChild without a template `*ngIf` statement should be set to `{static: false}` and be called in the `ngAfterViewInit()` hook: 
##### Add to `ngOnInit()`
```javascript
public ngOnInit(): void {
    this.obtainStylePayload();
    this.obtainLocalToken();
}
```
##### Add to `ngAfterViewInit()`
```javascript
public ngAfterViewInit(): void {
    this.setBotDirective();
}
```
Add ViewChild template dom elements:
```html
<!--- app.component.html -->
<div class="flex">
  <div class="main-container">
      <h1>Welcome to flight booker</h1>
      <div class="webchat-container" #botWindow></div>
  </div>
</div>
```
Add css styling to template to match with bot styling changes:
```css
<!--- app.component.css -->
:host,
.flex,
.main-container,
.webchat-container {
    height: 85%;
    overflow: hidden;
    color: white;
}
.flex {
    display: flex;
    height: 100%;
}
...
```
Lastly, include the Web Chat CDN to the index.html file:
```html
<!--- index.html -->
<script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
```
That's It! You should be off and running at this point

I am aware that more options from the webchat api will need to have the option to passthrough through the payload such as userId and Name and other api properties. This will be added in a future release.

## Advanced Installation
You, like all great developers, like to have full-controll of your library's capabilities. The previous use case can be for production and demo purposes but there may be other features/concerns such as connection status checks, postActivity, general api information, etc. that you would want full access to.

With the v1.1.0 update the `BotHelperDirective`'s primary function is the renderWebChat() method. This is overloaded with 4 signatures total. This allows you to take over direct control over the WebChat api's properties and methods.

The main reason for this is to gain access to the directLine api and all of the other `WebChat` properties and methods. You can read more about all of the directLine api capabilities here <a href="https://github.com/microsoft/BotFramework-DirectLineJS" target="_blank">https://github.com/microsoft/BotFramework-DirectLineJS</a>. Later, I will illustrate how to install the npm DirectLineJS library to use the `ConnectionStatus` class for granular bot activity returns such as `FailedToConnect`.  

### Advanced installation instructions
If you followed the instructions above. In your app.component.ts file's `ngAfterViewInit()` comment out the following:
```javascript
<!--- app.component.ts -->
// this.setBotDirective();
```
Import `botHelperDirective` and `IWebChat` from the `ngx-microsoft-bot-framework` library:
```javascript
import { ..., BotHelperDirective, IWebChat, ... } from 'ngx-microsoft-bot-framework';
```
Add the `BotHelperDirective` to the app component providor:
```javascript
@Component({
  ...
  providers: [BotService, ComService, BotDirective, BotHelperDirective, StyleSetDirective],
  ...
})
```
Add the `renderObject` property :
```javascript
renderObject: IWebChat;
```
Add `BotHelperDirective` and `BotService` to the constructor:
```javascript
constructor(
    private comService: ComService,
    private bot: BotDirective,
    private botHelper: BotHelperDirective,
    private botService: BotService,
) { }
```
Copy this code into your app component below your `ngOnInit` function:
```javascript
    customBotDirective(): void {
      let token: string;
      this.passViewChild = this.botWindowElement.nativeElement;
      this.botService.getTokenObs()
        .subscribe(
          response => {
            this.payload.secretSetting ? token = response.body : token = this.payload.secret;
                if (response.status == 200 && response.statusText == 'OK' || response == false) {
                  const directLine = window.WebChat.createDirectLine({
                      secret: token,
                      webSocket: true
                  });

                  const styleSet = window.WebChat.createStyleSet(this.stylesetPayload);
                  
                  let userId = 'USER_ID';
                  this.renderObject = {
                    directLine: directLine,
                    userID: 'USER_ID',
                    styleOptions: this.styleOptionsPayload,
                    styleSet: styleSet,
                    disabled: false
                  }
                  // this.bot.renderWebChat(this.passViewChild, null, directLine, userId, this.styleOptionsPayload, styleSet);

                  this.botHelper.renderWebChat(this.passViewChild, this.renderObject);

                   directLine
                    .postActivity({
                        from: { id: "USER_ID", name: "USER_NAME" },
                        name: "requestWelcomeDialog",
                        type: "event",
                        value: "token"
                    })
                    .subscribe(
                        id => console.log(`Posted activity, assirgned ID ${id}`),
                        error => console.log(`Error posting activity ${error}`)
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
                        ... css here       
                      }
                    );
                }
        });
      }
```
Let's break apart the above code to understand what is going on here

1. Use the `botService` to generate your payload's token settings
2. Initiate the `WebChat.createDirectLine` api
```javascript
this.botService.getTokenObs()
        .subscribe(
          response => {
            this.payload.secretSetting ? token = response.body : token = this.payload.secret;
                if (response.status == 200 && response.statusText == 'OK' || response == false) {
                  const directLine = window.WebChat.createDirectLine({
                      secret: token,
                      webSocket: true
                  });
```
3. Use the `botHelper`'s `renderWebChat()` to intiate the `WebChat` api properties.  Below is an example object, `renderObject` of api properties that can be set.
##### Note: You can choose to render the object to pass through or use individual settings in the method overload to intitate the `renderWebChat()` method. Either provide settings and not the renderObject i.e. `null` or the `this.passViewChild` and `this.renderObject` property and object
A short list of the `WebChat` can be found here: [Api Properties](#api)
```javascript
let userId = 'USER_ID';
this.renderObject = {
  directLine: directLine,
  userID: 'USER_ID',
  styleOptions: this.styleOptionsPayload,
  styleSet: styleSet,
  disabled: false
}
// this.bot.renderWebChat(this.passViewChild, null, directLine, userId, this.styleOptionsPayload, styleSet);

this.botHelper.renderWebChat(this.passViewChild, this.renderObject);
```
4. Use `directLine.postActivity()` to initiate the bot i.e. a welcome adaptive card that begins when the bot is loaded
```javascript
directLine
  .postActivity({
      from: { id: "USER_ID", name: "USER_NAME" },
      name: "requestWelcomeDialog",
      type: "event",
      value: "token"
  })
  .subscribe(
      id => console.log(`Posted activity, assirgned ID ${id}`),
      error => console.log(`Error posting activity ${error}`)
  );
```
5. If using idiosyncratic styling, mentioned previously, initiate the `WebChat.createStyleSet()` method and pass through the `stylesetPayload` object previously create for your styling options
```javascript 
const styleSet = window.WebChat.createStyleSet(this.stylesetPayload);
```
6. Next, if you want to further customize styling the `styleSet` property here is an example of a customized styling option
```javascript
styleSet.textContent = Object.assign(
  {},
  styleSet.textContent,
  {
    cursor: 'crosshair',
    color: 'white'
  }
);
```
7. Lastly, initiate the function in `ngAfterViewInit()`
```javascript
this.customBotDirective();
```
8. Bonus! If you want complete granular control of the `DirectLine` class and other classes such as `ConnectionStatus` import in the `BotFramework-DirectLineJS` <a href="https://github.com/microsoft/BotFramework-DirectLineJS" target="_blank"> library documented here</a> after installing the npm package
```javascript
npm i botframework-directlinejs

import { DirectLine, ConnectionStatus } from 'botframework-directlinejs';
```
Example usage:
```javascript
directLine.connectionStatus$
.subscribe(connectionStatus => {
  let msg: string;
    switch(connectionStatus) {
        case ConnectionStatus.Uninitialized:    // the status when the DirectLine object is first created/constructed
        msg = 'uninitialized'
        case ConnectionStatus.Connecting:       // currently trying to connect to the conversation
        msg = 'connecting'
        case ConnectionStatus.Online:           // successfully connected to the converstaion. Connection is healthy so far as we know.
        msg = 'online'
        case ConnectionStatus.ExpiredToken:     // last operation errored out with an expired token. Your app should supply a new one.
        case ConnectionStatus.FailedToConnect:  // the initial attempt to connect to the conversation failed. No recovery possible.
        msg = 'FAILED'
        case ConnectionStatus.Ended:            // the bot ended the conversation
    }
    console.log('msg = ', msg)
});
```

## Bot Demo
The demo is live bot on the repository's `github.io` page here: <a href="https://xtianus79.github.io/ngx-microsoft-bot-framework/" target="_blank">https://xtianus79.github.io/ngx-microsoft-bot-framework</a>

## API
Below is a short list of api properties if you choose to pass through the `renderObject` in the `bot.renderWebChat()` method. A full list can be found here: <a href="https://github.com/microsoft/BotFramework-WebChat#web-chat-api-reference" target="_blank">https://github.com/microsoft/BotFramework-WebChat#web-chat-api-reference</a>

| Property             | Description           |
| :------------        |:-------------| 
| activityMiddleware   | 	A chain of middleware, modeled after Redux middleware, that allows the developer to add new DOM components on the currently existing DOM of Activities. The middleware signature is the following: options => next => card => children => next(card)(children). | 
| attachmentRenderer   | The "flattened" version of attachmentMiddleware.      | 
| createDirectLine     | A factory method for instantiating the Direct Line object. Azure Government users should use `createDirectLine({ domain: 'https://directline.botframework.azure.us/v3/directline', token })`; to change the endpoint. The full list of parameters are: conversationId, domain, fetch, pollingInterval, secret, streamUrl, token, watermark webSocket.      | 
| disabled             | Disable the UI (i.e. for presentation mode) of Web Chat. |
| directLine           | Specify the DirectLine object with DirectLine token. We strongly recommend using the token API for authentication instead of providing the app with your secret. To learn more about why, see the authentication documentation or connecting client app to bot        |
| styleOptions         | Object that stores customization values for your styling of Web Chat. For the complete list of (frequently updated) default style options, please see the defaultStyleOptions.js file. |
| styleSet             | The non-recommended way of overriding styles. |

## Compatiblity
Comaptible as of Angular 8 ivy with botframework-webchat 4.5.1 for `ngx-microsoft-bot-framework` 1.0.0 - 1.1.0

## Troubleshooting
Report issues for help

## Contribution
Help is always welcome! This library will follow it's compatibility with official release from the official botframework-webchat api. Contributions include not only pull requests but feature additions/recommendations and feedback for improving the library.  

## License
### MIT
