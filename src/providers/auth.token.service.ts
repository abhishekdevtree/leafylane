import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private access_token: any = '';

  constructor() {}

  getLocalToken(): String {
    return this.access_token;
  }

  setLocalToken(token: String) {
    this.access_token = token;
  }
}
