import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { AuthTokenService } from './auth.token.service';
import { GlobalsService } from './globals.service';
import { UserService } from './user-service';
import { EventsService } from './events.service';

@Injectable({
  providedIn:'root'
})
export class AuthService {

  [key: string]: any;

  public validateTokenCallComplete = signal<Boolean>(false);
  public isLoggedIn = false;
  public user: any;

  private http = inject(HttpClient);

  // USER LOGIN

  loginArea = true;
  forgotArea = false;
  code;
  captchaValue = '';
  captchaSuccess: boolean = false;
  public type = 'password';
  public showPass = false;
  userExist = false;
  firstScreen = true;
  signupScreen = false;
  signupFirst = true;
  signupSecond = false;
  firstForm = true;
  secondForm = false;
  requestID;
  myDate = new Date();


  constructor(
    private globals: GlobalsService, 
    private userService: UserService, 
    public router: Router, 
    public location: Location, 
    public loader: LoadingBarService, 
    private events: EventsService, 
    private authTokenservice: AuthTokenService
  ) { }

  signUpUser(userinfo): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/register', userinfo)
        .toPromise()
        .then(
          async (data: any) => {
            if (typeof data.response == 'object') {
              // console.log('token', data.response.token);
              this.authTokenservice.setLocalToken(data.response.token);
              this.globals.setCookie('access_token', data.response.token);
              try {
                await this.validateToken();
              } catch (err) {

              }


              // console.log(this.storage);
              // console.log(this.storage.getItem('access_token'));
            }
            resolve(data);
          },
          (err: any) => {
            console.log(err);
            this.globals.showErrorAlert(err.error.message);
            reject(err.error.message);

          }
        );
    });
    return promise;
  }

  loginUser(userinfo): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/login', userinfo)
        .toPromise()
        .then(
          async (data: any) => {
            if (typeof data.response == 'object') {
              // console.log('token', data.response.token);
              this.authTokenservice.setLocalToken(data.response.token);
              this.globals.setCookie('access_token', data.response.token);
              try {
                await this.validateToken();
              } catch (err) {

              }
              // console.log(this.storage);
              // console.log(this.storage.getItem('access_token'));
            }
            resolve(data);
          },
          (err: any) => {
            console.log(err);
            this.globals.showErrorAlert(err.error.message);
            reject(err.error.message);

          }
        );
    });
    return promise;
  }

  validateToken(): Promise<any> {
    // console.log('calling validate token');
    let promise = new Promise(async (resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/validate-token', {})
        // .toPromise()
        .subscribe(
          (data: any) => {
            if (data.code == 200 && typeof data.response == 'object') {
              // console.log(data.response);
              this.setValidUser(data.response);
              setTimeout(async () => {
                try {
                  if(this.userService.cart.items.length > 0) {
                    await this.userService.mergeCart({ items: this.userService.cart.items.map(item => ({ product: item.product, qty: item.qty })) });
                    this.globals.setCookie('cart', JSON.stringify( { items: [], final_cart_value: 0 } ));
                  }
                  this.userService.myCart();
                } catch (error) {
                  console.log('error merging cart', error);
                }
                
              }, 0);
              resolve(data.response);
            } else {
              this.isLoggedIn = false;
              this.user = {};
              resolve(false);
            }
            // console.log('validate token call complete');
          },
          (err: any) => {
            this.isLoggedIn = false;
            this.user = {};
            reject(err.error.message);
          }
        );
    });
    return promise;
  }

  logout() {
    this.globals.redirectedLink = '';
    this.loader.start();
    this.unsetUser();
    this.router.navigate(['/']);
    this.loader.complete();
  }

  setValidUser(data) {
    this.isLoggedIn = true;
    this.user = data.authUser;
    this.events.emit('userLoggedIn', true);
  }

  unsetUser() {
    this.isLoggedIn = false;
    this.authTokenservice.setLocalToken('');
    this.user = {};
    this.globals.deleteCookie('access_token'); 
    this.userService.cart =  this.globals.getCookie('cart') ? JSON.parse(this.globals.getCookie('cart')) : { items: [], final_cart_value: 0 };
    this.events.emit('userLoggedOut', true);
  }

  

  forgotPwdRequest(request): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'students/request-otp', request)
        .toPromise()
        .then(
          (data: any) => {
            if (typeof data == 'object') {
              this.globals.showSuccessAlert('OTP has been sent to you');
              resolve(data);
            } else {
              resolve(false);
            }
          },
          (err: any) => {
            // console.log('as');
            this.globals.showErrorAlert(this.userService.getError(err));
            reject(this.userService.getError(err));
          }
        );
    });
    return promise;
  }

  forgotPwdReset(reset): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'students/change-password-using-otp', reset)
        .toPromise()
        .then(
          (data: any) => {
            if (typeof data == 'object') {
              this.globals.showSuccessAlert('Password has been updated successfully. Please login with new password');
              resolve(data);
            } else {
              resolve(false);
            }
          },
          (err: any) => {
            console.log(err);
            this.globals.showErrorAlert(this.userService.getError(err));
            reject(this.userService.getError(err));
          }
        );
    });
    return promise;
  }

  checkMailAvailabilityService(userinfo): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/check-mail-availability', userinfo)
        .toPromise()
        .then(
          (data: any) => {
            resolve(true);
          },
          (err: any) => {
            // this.globals.showErrorAlert(this.userService.getError(err));                        
            reject(err.error.message);
          }
        );
    });
    return promise;
  }

  changePassword(payload): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'admin/users/change-password', payload)
        .toPromise()
        .then(
          (data: any) => {
            console.log(data);
            if (typeof data == 'object') {
              resolve(data);
            } else {
              resolve(false);
            }
          },
          (err: any) => {
            console.log(err);
            this.globals.showErrorAlert(err.error.message);
            reject(err.error.message);
          }
        );
    });
    return promise;
  }

  getCSRFToken() : Promise<any> {
    let promise = new Promise((resolve, reject) => {
      const salt = (new Date()).getTime();
      this.http.get(this.globals.get('appConfig').apiUrl+'web-csrf-token?t='+salt, {withCredentials: true})
      .toPromise()
      .then(       
          (data:any) => {
              // console.log('CSRF token received');
              resolve(true);
          }, 
          (err:any) => {                      
              reject(this.userService.getError(err));
          }
      );
    });
    return promise;
  }
    
  getToken(): String {
    this.authTokenservice.setLocalToken(this.globals.getCookie('access_token'));
    return this.authTokenservice.getLocalToken();
  }

  getUser(): Object {
    return this.user; 
  }

  authenticated(): boolean {
    return this.isLoggedIn;
  }

  get(key) {
    return this[key];
  }
  set(key, value) {
    return this[key] = value;
  }

  // goToNotificationDetailPage(notification){
  //   console.log(notification);

  //   switch (notification.type) {
  //     case 'user-reported-issue':
  //         this.router.navigate(['customer-support/'+ notification.dependent.ticketID] );
  //     //   this.globals.goToPage('CustomerSupportIssueDetailsPage', {id: notification.dependent.ticketID});
  //     break;

  //     case 'model-post-approval-by-admin':
  //     case 'user-comment-on-post':
  //         this.globals.openPostModel(notification.dependent.postID); 
  //     //   this.globals.goToPage('PostDetailsPage', {post: notification.dependent.postID});
  //     break;

  //     case 'model-new-post-to-follower': //when favourite model post user get a notification
  //     // this.globals.goToPage('ModelDetailsPage', {model: notification.dependent.modelID});
  //     break;

  //     case 'user-subscription-of-post':
  //         this.globals.openPostModel(notification.dependent.post.id); 
  //     //   this.globals.goToPage('PostDetailsPage', {post: notification.dependent.post.id});
  //     break;

  //     case 'user-subscription-of-model-chat':

  //         this.router.navigate(['chat/'+ notification.dependent.user.id] );
  //         //   this.globals.goToPage('ChatDetailsPage', {chatUser: this.globals.getChatUserInfo(notification.dependent.user.id)});
  //         break;

  //     case 'redemption-status-change-by-admin':
  //         this.router.navigate(['my-earnings'] );
  //     //   this.globals.goToPage('CreditDisbursementPage', {type: notification.type});
  //     break;

  //     case 'user-new-message':
  //         //   console.log(JSON.parse(notification.sender)['_id']);
  //           this.router.navigate(['chat/'+ JSON.parse(notification.sender)['_id']] );
  //           // if(notification.sender){
  //             //   this.globals.goToPage('ChatDetailsPage', {chatUser: this.globals.getChatUserInfo(JSON.parse(notification.sender)['_id'])});
  //           // } else {
  //           //     this.globals.goToPage('ChatDetailsPage', {chatUser: this.globals.getChatUserInfo(notification.dependent.user.id)});
  //           // }
  //     break;



  //     default:  console.log("Unknown")
  //  }
  // }



  // COMPANY USER AUTH


  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  goToHome() {
    // this.location.replaceState('/');
    this.router.navigate(['/login']);
  }


  goToForgotPassword() {
    this.loginArea = false;
    this.forgotArea = true;

  }
  goToLogin() {
    this.loginArea = true;
    this.forgotArea = false;
  }


  getOTP() {
    this.loader.start();
    // console.log(username);
    var request = {
      platform: 'Email',
      uique_platform_id: (<any>this).mobile,
      purpose: 'Reset Password'
    };
    this.forgotPwdRequest(request).then(function (response) {
      if (response) {
        this.firstForm = false;
        this.secondForm = true;
        this.loader.complete();
        this.requestID = response._id;
        // this.navCtrl.push(OtpPage, {requestID: response.requestID} );
      }
    }.bind(this), function (err) {
      this.loader.complete();
    }.bind(this));
  }

  otpController(event, next, prev) {
    (<any>this).OTP = (<any>this).one + (<any>this).two + (<any>this).three + (<any>this).four;
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  resetPwd() {
    var reset = {
      otp_request_id: this.requestID,
      otp: (<any>this).OTP,
      new_password: (<any>this).newpassword,
    };
    this.loader.start();
    this.forgotPwdReset(reset).then(function (success) {
      this.loader.complete();
      if (success) {
        // console.log(this);
        this.loginArea = true;
        this.forgotArea = false;
      }
    }.bind(this), function (err) {
      this.loader.complete();
    }.bind(this));
  }



  hideSecondScreen() {
    this.firstForm = true;
    this.secondForm = false;

    this.requestID = '',
      (<any>this).OTP = '',
      (<any>this).newpassword = '',
      (<any>this).confirmPassword = ''
  }


  captcha() {
    this.captchaSuccess = false;
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
      var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    this.code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    document.getElementById("mainCaptcha").innerHTML = this.code;
    (<HTMLInputElement>document.getElementById("mainCaptcha")).value = this.code;
  }

  validCaptcha() {

    var string1 = this.removeSpaces((<HTMLInputElement>document.getElementById('mainCaptcha')).value);
    var string2 = this.captchaValue;
    // console.log(string1,string2);
    if (string2 == '') {

      this.globals.showErrorAlert('Please Enter Captcha');
    }
    else if (string1 == string2) {
      this.captchaSuccess = true;
      // console.log('matched');
      return true;
    } else {
      this.captchaSuccess = false;
      this.globals.showErrorAlert('Invalid Captcha');
      return false;
    }
  }

  removeSpaces(string) {
    return string.split(' ').join('');
  }


  test() {
    // this.userExist = true;
    this.firstScreen = false;
    this.signupScreen = true
  }

  resetLoginModal() {
    this.userExist = false;
    this.firstScreen = true;
    this.signupScreen = false;
    this.signupFirst = true;
    this.signupSecond = false;
    this.firstForm = true;
    this.secondForm = false;
  }

  setDefaultAddress(data): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.get('appConfig').apiUrl + 'user/users/addresses/set-default', data)
        .toPromise()
        .then(
          (data: any) => {
            if (typeof data == 'object') {
              resolve(data.response);
              this.user.addresses = data.response.addresses;
            } else {
              resolve(false);
            }
          },
          (err: any) => {
            reject(this.getError(err));
          }
        )
    });
    return promise;
  }

  getError(err) {
    var error = err['error'];
    console.log(typeof error.errors, typeof error.errors.details, error.errors.details.length)
    if (typeof error.errors != undefined && typeof error.errors.details == 'object' && error.errors.details.length) {
      console.log('het: ',)
      return error.errors.details[0].message;
    } else {
      return error.message;
    }
  }

}