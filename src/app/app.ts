import { Component, Inject, PLATFORM_ID, HostListener, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet, RouterModule } from '@angular/router';
import { LoadingBarModule, LoadingBarService, NgxLoadingBar } from '@ngx-loading-bar/core';
// import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from '../providers/auth.service';
import { AuthTokenService } from '../providers/auth.token.service';
import { GlobalsService } from '../providers/globals.service';
import { UserService } from '../providers/user-service';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@full-fledged/alerts';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule, LoadingBarModule, AlertModule,HeaderComponent,FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {

  static isBrowser = new BehaviorSubject<boolean>(null);
  showLogin: boolean = false;
  showChange: boolean = false;
  showSignup: boolean = false;
  loginBox: boolean = true;
  signUpBox: boolean = false;
  forgotPasswordBox = false;
  verifyPasswordBox = false;
  changPasswordBox = false;
  otpReceived: boolean = false;
  rating = 0;

  password: string = '';
  name: string = '';
  email: string = '';
  mobile: string = '';
  confirmPassword: string = '';
  isLoading = signal(false);

  @ViewChild('logimModalCloseBtn') logimModalCloseBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    public auth: AuthService, 
    public authTokenService: AuthTokenService,
    public globals: GlobalsService, 
    public loader: LoadingBarService, 
    public userService: UserService, 
    public router: Router, 
    public location: Location, 
    public activatedRoute: ActivatedRoute
  ) {

    App.isBrowser.next(isPlatformBrowser(platformId));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading.set(false);
      }
    });
  }

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    
    const token = this.auth.getToken();

    this.userService.cart = this.userService.getCart();
    
    try {
      if(token) {
        await this.auth.validateToken();
      }
      
    } catch (error) {
      // console.log('Token validation failed', error);
      this.authTokenService.setLocalToken('');
    }

    this.auth.validateTokenCallComplete.set(true);

  }

  hideAllDiv() {
    this.signUpBox = false;
    this.loginBox = false;
    this.forgotPasswordBox = false;
    this.verifyPasswordBox = false;
    this.changPasswordBox = false;

    this.password = '';
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.confirmPassword = '';
    this.otpReceived = false;
  }


  showLoginBox() {
    // this.signUpBox = !this.signUpBox;
    this.hideAllDiv();
    this.loginBox = true;
  }

  showSignupBox() {
    // this.loginBox = !this.loginBox;
    this.hideAllDiv();
    this.signUpBox = true;
  }

  showPasswordBox() {
    // this.loginBox = !this.loginBox;
    this.hideAllDiv();
    this.forgotPasswordBox = true;
  }
  showVerificationBox() {
    this.otpReceived = true;
  }
  showChangePasswordBox() {
    // this.loginBox = !this.loginBox;
    this.hideAllDiv();
    this.verifyPasswordBox = true;
  }

  togglePasswordSignIn() {
    this.showLogin = !this.showLogin;
  }

  togglePasswordSignUp() {
    this.showSignup = !this.showSignup;
  }
  togglePasswordChange() {
    this.showChange = !this.showChange;
  }

  changeRating(value) {
    if (this.rating == 1 && value == 1) {
      this.rating = 0;
    }
    else {
      this.rating = value;
    }
  }

  async signup() {

    let data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'customer',
    }

    this.loader.start();
    try {
      const response = await this.auth.signUpUser(data);
      if (response) {
        if (this.auth.authenticated()) {
          this.hideAllDiv();
          this.logimModalCloseBtn.nativeElement.click();
        } else {
          this.auth.logout();
        }
      }
    } catch (err) {
      // console.log(err);
      // console.log(err.toString());
    }
    this.loader.complete();
  }

  async login() {
    let data = {
      email: this.email,
      password: this.password,
    }
    this.loader.start();
    try {
      const response = await this.auth.loginUser(data);
      if (response) {
        if (this.auth.authenticated()) {
          this.hideAllDiv();
          this.logimModalCloseBtn.nativeElement.click();
        } else {
          this.auth.logout();
        }
      }
    } catch (err) {
      // console.log(err);
      // console.log(err.toString());
    }
    this.loader.complete();

  }

  outerClick(){
    this.globals.searchSuggestion.set(false);
  }
}


