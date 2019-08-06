import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { IPayload } from '../interfaces/bot-payload';
import { DEFAULT_OPTIONS } from '../interfaces/default-options';

@Injectable()
export class ComService {

  // Observable string sources
  private secretDirectlineToken = new Subject<IPayload>();
  private styleSetPayload = new Subject<DEFAULT_OPTIONS>();
  private styleOptionsPayload = new Subject<DEFAULT_OPTIONS>();

  // Observable string streams
  botPayload$ = this.secretDirectlineToken.asObservable();
  styleSet$ = this.styleSetPayload.asObservable();
  styleOptions$ = this.styleOptionsPayload.asObservable();

  // Service message commands
  obtainToken(payload: IPayload) {
    this.secretDirectlineToken.next(payload);
  }

  obtainStylePayload(styleoptionsPayload?: DEFAULT_OPTIONS, stylesetPayload?: DEFAULT_OPTIONS) {
    this.styleSetPayload.next(stylesetPayload);
    this.styleOptionsPayload.next(styleoptionsPayload);
  }
}