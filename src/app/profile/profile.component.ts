import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '../password/password.component';
import { OrdersComponent } from '../orders/orders.component';
import { AddressComponent } from '../address/address.component';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { WishlistComponent } from '../wishlist/wishlist.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule,FormsModule, PasswordComponent,WishlistComponent,OrdersComponent,AddressComponent,AccountInfoComponent]
})
export class ProfileComponent implements OnInit {

  targetMenuItem: any;
  isMenuActive = false;

  constructor(private titleService:Title,public router: Router,public route: ActivatedRoute, public auth: AuthService) { 
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe(params => {
      this.targetMenuItem = params['menuItem'];
    })
  }

  toggleMenu(type){
    if(type == 'open'){
      this.isMenuActive = true;
    }
    if(type == 'close'){
      this.isMenuActive = false;
      console.log('error');
    }
  }

}
