import { HttpHeaders } from '@angular/common/http';

export interface Payload_Response {
  body?: string;
  headers?: HttpHeaders;
  ok?: boolean;
  status?: number;
  statusText?: string;
  type?: number;
  url?: string;
  operation: any[];
  result: {};
  true?;
}