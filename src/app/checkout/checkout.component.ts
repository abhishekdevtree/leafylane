import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../providers/auth.service';
import { EventsService } from '../../providers/events.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule,FormsModule,RouterLink]
})
export class CheckoutComponent implements OnInit {

  errorUserExists = false;


  constructor(public auth: AuthService, public loader: LoadingBarService, public userService: UserService, public router: Router, public events: EventsService, public globals: GlobalsService) {
  }

  arr = ["Abhi", "Ankita", "Ayush"];

  user = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: ''
  };

  newAddress = {
    label: '',
    mobile: '',
    password: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: ''
  };


  selectedAddressIndex = -1;

  ngOnInit(): void {

    this.events.listen('userLoggedIn', () => {
      this.selectedAddressIndex = this.auth.user && this.auth.user.addresses.findIndex(item => item.isDefault);
    })
    if (this.auth.user && this.auth.user.role == 'customer') {
      setTimeout(async () => {
        await this.userService.myCart();
        if (this.userService.cart.items.length == 0) {
          this.router.navigate(['/cart']);
        }
      }, 0);
    }

    this.selectedAddressIndex = this.auth.user && this.auth.user.addresses.findIndex(item => item.isDefault);

  }


  async proceedToPayment() {

    this.loader.start();

    if (!(this.auth.user && this.auth.user.role == 'customer')) {
      let data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: 'customer',
      }


      try {
        this.errorUserExists = false;
        const response = await this.auth.signUpUser(data);


        let addressData = {
          label: 'Home',
          line1: this.user.address1,
          line2: this.user.address2,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.pincode.toString(),
          country: 'India',
          phone: this.user.mobile.toString(),
          isDefault: true
        }

        await this.userService.addAddress(addressData);
        this.router.navigate(['/payment']);
      } catch (err) {
        if (err === "User is already registered!") {
          this.errorUserExists = true;

        }

      }

    } else {
      if (this.selectedAddressIndex == this.auth.user.addresses.length) {
        let addressData = {
          label: 'Home',
          line1: this.user.address1,
          line2: this.user.address2,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.pincode.toString(),
          country: 'India',
          phone: this.user.mobile.toString(),
          isDefault: true
        }

        try {
          await this.userService.addAddress(addressData);
          this.router.navigate(['/payment']);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.userService.setDefaultAddress({ addressId: this.auth.user.addresses[this.selectedAddressIndex]._id });
          this.router.navigate(['/payment']);
        } catch (error) {
          console.log(error);
        }
      }

    }

    this.loader.complete();
  }


}
