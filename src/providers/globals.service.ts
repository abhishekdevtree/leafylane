import { Injectable, Component, Renderer2, RendererFactory2, signal  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { EventsService } from './events.service';
import { ToastrService } from 'ngx-toastr';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import { environment } from '../environments/environment';

@Injectable({
  providedIn:'root'
})

export class GlobalsService {

  private appName = environment.appName;
  private appNamespace = this.appName + '-';
  
  public screenwidth;
  public searchString = '';
  public searchSuggestion = signal(false);
  private appConfig = {
    apiUrl: environment.baseURL[environment.apiEnv] + environment.backendPort[environment.apiEnv] + '/',
    liveUrl: environment.baseURL['prod'] + environment.frontendPort['prod'] + '',
    aws: environment.aws,
  };


  deliveryCharges = 50;

  quantity = 1;
  price = 44;
  subTotal = 44;
  totalPrice = 44;

  arr = ["Abhi","Ankita","Ayush"];

  quantityChecker(value){
    if(value=="increase"){
      this.quantity++;
      this.subTotal = this.price*this.quantity;
      this.totalPrice = this.subTotal*this.arr.length;
    }
    if(value == "decrease" && this.quantity>=2){
      this.quantity--;
      this.subTotal = this.price*this.quantity;
      this.totalPrice = this.subTotal*this.arr.length;
    }
    console.log(this.quantity);
  }

  deleteProduct(id){
    console.log(this.arr[id]);
    this.arr.splice(id,1);
    console.log(this.arr);
  }

  public successMessage = ''; 
  public errorMessage = ''; 
  public redirectedLink;

  company:any = null;
  template:any = null;

  actionMode = '';


  public unreadNotifications = 0;

  public pages = [];

  public showloginModal:boolean = false;

  public currentYear = new Date().getFullYear();
  public categories = [];




  constructor(private toast: ToastrService,private alertService: AlertService, rendererFactory: RendererFactory2, public router: Router, private events: EventsService, private cookieService: SsrCookieService){
      
  }

  removeByKey(array, params){
    var tmp = [];
    if(Array.isArray(array)){
        array.forEach(element => {
            if(element[params]==undefined){
                tmp.push(element) 
            } 
        });   
        return tmp;
    }    
    return [];
  }

  // Login a user
  // Normally make a server request and store
  // e.g. the auth token

  get(key) {
      return this[key];
  }

  showSuccessAlert(msg){
    this.toast.success(msg);
  }

  showErrorAlert(msg){
    this.toast.error(msg);
  }

  encodeQueryString(qobject) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(qobject))));
  }

  decodeQueryString(qstring) {
      return JSON.parse(decodeURIComponent(escape(atob(qstring))));
  }

  updateListView(list, item) {
    if(item._id) {
        list.forEach((element, index) => {
            if(element._id == item._id) {
                list[index] = item;
            }
        });
    }
  }   

  addToRemoveListView(list, item) {
    if(item._id) {
        var match = false;
        list.forEach((element, index) => {
            if(element._id == item._id && !match) {
                list.splice(index, 1);
                match = true;
            }
        });
        if(!match) {
            list.push(item);
        }
    }
  }



  IsValidJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }



  errorImageHandler(event) {
      //console.debug(event);
      event.target.src = "assets/images/global/black.jpg";
  }


  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  setCookie(key: string, value: string): void {
    this.cookieService.set(this.appNamespace + key, value);
  }

  getCookie(key: string): string {
    return this.cookieService.get(this.appNamespace + key);
  }

  deleteCookie(key: string): void {
    this.cookieService.delete(this.appNamespace + key);
  }
}
    
