import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { ComService } from './com.service';
import { Observable, Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class BotService {
  webchatUrl: string;
  subscription: Subscription;
  botTokenHeader: HttpHeaders;
  secretSetting: boolean;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private comService: ComService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('AppService');
    this.subscription = this.comService.botPayload$.subscribe(
      response => {
        this.botTokenHeader =
          httpOptions.headers.set('Authorization', 'BotConnector ' + response.secret);
        this.webchatUrl = response.url;
        this.secretSetting = response.secretSetting;
    });
  }

  /** GET temporary token from the server api */
  public getTokenObs (): Observable<any> {
    if (this.secretSetting) {
      return this.http.get<any>(
        this.webchatUrl, 
        { headers: this.botTokenHeader, observe: 'response' }
      )
      .pipe(
       catchError(this.handleError<any>('getTokenObs', []))
      );
    } else {
      return of<any>(false);
    }
  }

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError('makeIntentionalError', []))
      );
  }
}