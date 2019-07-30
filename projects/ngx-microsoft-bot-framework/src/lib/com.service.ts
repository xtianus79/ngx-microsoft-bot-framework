import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Payload } from './bot-payload';

@Injectable()
export class ComService {

  // Observable string sources
  private secretDirectlineToken = new Subject<Payload>();
  private styleSetPayload = new Subject<any>();
  private styleOptionsPayload = new Subject<any>();

  // Observable string streams
  secretToken$ = this.secretDirectlineToken.asObservable();
  styleSet$ = this.styleSetPayload.asObservable();
  styleOptions$ = this.styleOptionsPayload.asObservable();


  // Service message commands
  obtainToken(payload: Payload) {
    console.log('this fired off', payload)
    this.secretDirectlineToken.next(payload);
  }

  obtainStylePayload(stylesetPayload?: any, styleoptionsPayload?: any) {
    console.log('this WENT OFF ', stylesetPayload);
    console.log('this WENT OFFFF ', styleoptionsPayload);
      this.styleSetPayload.next(stylesetPayload);
      this.styleOptionsPayload.next(styleoptionsPayload);
  }
}