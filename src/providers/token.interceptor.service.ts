import { Injectable, Injector, inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor, HttpHandlerFn } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, from as fromPromise } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { AuthTokenService } from './auth.token.service';

const addAuthenticationToken = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const authTokenservice = inject(AuthTokenService); 
  const tokenExtractor = inject(HttpXsrfTokenExtractor);

  const localToken = authTokenservice.getLocalToken();
  const xsrfToken = tokenExtractor.getToken();

  let getTokenInProgress = false;
  const getTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  const headers: any = {};
  if (localToken) headers['Authorization'] = `Bearer ${localToken}`;
  if (xsrfToken) headers['X-XSRF-TOKEN'] = xsrfToken;

  if (Object.keys(headers).length > 0) {
    req = req.clone({ setHeaders: headers });
  }

  return next(req);

  // return next(req).pipe(catchError((error) => {
  //   console.log("error in http call", error);
  //   if (error.status !== 403) {
  //     return throwError(error);
  //   }

  //   if(getTokenInProgress) {
  //     console.log("token getting in progress..");
  //     return getTokenSubject.pipe(
  //       filter(result => result !== null),
  //       take(1),
  //       switchMap(() => addAuthenticationToken(req, next))
  //     );
  //   } else {
  //     console.log("token getting started..");
  //     getTokenInProgress = true;
  //     getTokenSubject.next(null);
      
  //     return fromPromise(auth.getLocalToken()).pipe(
  //       switchMap((token: any) => {
  //         console.log("token getting completed successfully");
  //         getTokenInProgress = false;
  //         getTokenSubject.next(token);
  //         return addAuthenticationToken(req, next);

  //       }),
  //       catchError((error: any) => {
  //           console.log("error in token get");
  //           getTokenInProgress = false;
  //           auth.unsetUser();
  //           return throwError(() => error);
  //       })
  //     );

  //   }
  // }));
}

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  return addAuthenticationToken(req, next);

};