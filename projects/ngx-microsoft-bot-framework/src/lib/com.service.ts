import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Payload } from './bot-payload';
import { DEFAULT_OPTIONS } from './default-options';

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
    this.secretDirectlineToken.next(payload);
  }

  obtainStylePayload(styleoptionsPayload?: any, stylesetPayload?: any) {
    this.styleSetPayload.next(stylesetPayload);
    this.styleOptionsPayload.next(styleoptionsPayload);
  }
}