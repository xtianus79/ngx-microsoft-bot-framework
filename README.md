# ngx-microsoft-bot-framework
[Why ngx-microsoftbot-framework?](#why-ngx-microsoft-bot-framework?) | [Table of Contents](#table-of-contents)

<div>
    <a href="https://badge.fury.io/js/ngx-microsoft-bot-framework"><img src="https://badge.fury.io/js/ngx-microsoft-bot-framework.svg" alt="npm version" height="18"></a>
    <a href="https://npmjs.org/ngx-microsoft-bot-framework"><img alt="npm" src="https://img.shields.io/npm/dm/ngx-microsoft-bot-framework?color=blue&style=flat-square" alt="npm downloads"></a>
    <a href="https://david-dm.org/xtianus79/ngx-microsoft-bot-framework"><img alt="npm" src="https://david-dm.org/xtianus79/ngx-microsoft-bot-framework.svg" alt="npm dependencies"></a>
</div>

<a target="_blank" href="https://github.com/xtianus79/ngx-microsoft-bot-framework"><img src="https://i.imgur.com/UZVFXHS.png"/></a>

# Why ngx-microsoft-bot-framework?
This Angular library achieves 2 goals

1. Easy setup to render a Web Chat bot in your Angular application including providing the secret webchat key for the bot application. You can use a web call for a temporary token or directly use your secret key.
2. It allows you to add 2 styling guidelines for your microsoft chat bots

    2a. The **Recommended** styling model from Microsoft is the "Branding Webchat Styling." This is achieved via styleSetOptions. This has limited style set options that adhere to a predefined property set of mutable styles. More information can be found here: 
    [Branding WebChat Styling.](https://github.com/microsoft/BotFramework-WebChat/tree/master/samples/05.a.branding-webchat-styling)

    2b. The **Other alternative** to styling the chat bot is the "Idiosyncratic Manual Styling." This is acheived via createStyleSet. This has full access to the webchat dependency for styling specific property methods. More information can be found here: 
    [Idiosyncratic Manual Styling.](https://github.com/microsoft/BotFramework-WebChat/tree/master/samples/05.b.idiosyncratic-manual-styling)
    

You can add a one or both objects to achieve your styling goals. From my testing you may have to use both styles because the base properties are not the same across methods. Text color is achieved in styleSetOptions but not used in createStyleSet.  So while createStyleSet allows you to use custom objects i.e. root you will need the other payload to achieve text styling.  Hopefully, Microsoft works this out in future updates.  

### My recommended styling option:
If you want complete custom styling to a granular level then I would use both payloads with that exact same base options along with the createStyleSet payload of custom styling objects. I will give specific examples below. *Make sure to read the bot documentation for a full understanding of each styling pattern.* 

## Table of contents
1. [Before We Begin](#before-we-begin)
2. [Installation](#installation)
3. [Bot Demo](#bot-demo)
4. [API](#api)
5. [Compatibility](#compatibility)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contribution)

## Before We Begin
First, read over the documentation about the [Bot Framework Web Chat](https://github.com/microsoft/BotFramework-WebChat) api. 

> This repository contains code for the Bot Framework Web Chat component. The Bot Framework Web Chat component is a highly-customizable web-based client for the Bot Framework V4 SDK. The Bot Framework SDK v4 enables developers to model conversation and build sophisticated bot applications.

***Warning*** The information can be a lot to take in at first.  And the npm install botframework-webchat referred to in the documentation is specifically built for React. Hence, why I built this repo specifically for Angular.

The good news is the core of the Web Chat api is on a URL called [Web Chat CDN](https://github.com/microsoft/BotFramework-WebChat/blob/master/samples/01.a.getting-started-full-bundle/README.md)

Next, Well you're going to need a bot! So where do we get one of these awesome bots? Create and learn about the Microsoft Bot Framework over at the [Azure Bot Service.](https://azure.microsoft.com/en-us/services/bot-service) Here you can create a bot and obtain a secret key for the Web Chat setup. 

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

Import the module and all its directives and interfaces:
```javascript
import { BotDirective, StyleSetDirective, AppService, ComService, Payload, DEFAULT_OPTIONS } from 'ngx-microsoft-bot-framework';
```
Add these 2 properties
```javascript
@ViewChild("botWindow", { static: false }) botWindowElement: ElementRef;
passViewChild: ViewChild;
```

Add the default `Payload` property:
#### Note: The url is optional if the `secretSetting` is set to false
The false setting for `secretSetting` disables the web call to the botframework/api/token generator so the url is not neccessary:
```javascript
payload: Payload = {
    secret: 'VQDSUGBn3Lo.SxWHKP4UXAvJWZaLXkUQGBABH4sjZU3NIjeesJnmW-g',
    url: 'https://webchat.botframework.com/api/tokens',
    secretSetting: true
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
Add the bot services and bot directive to the constructor:
```javascript
constructor(
    private appService: AppService,
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

## Bot Demo
info coming soon

## API
info coming soon

## Compatiblity
info coming soon

## Troubleshooting
info coming soon

## Contribution
info coming soon

## License
### MIT
