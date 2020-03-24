import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JSONInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && req.headers.get("Content-Type") == "application/json") {
          event = event.clone({
            body: JSON.parse(event.body)
          })
        }
        return event
      })
    );
  }
}
