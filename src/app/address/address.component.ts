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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  imports: [CommonModule,FormsModule]
})
export class AddressComponent implements OnInit {

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

  constructor(public auth: AuthService, public loader: LoadingBarService, public userService: UserService, public router: Router, public events: EventsService, public globals: GlobalsService) { }

  selectedAddressIndex = -1;

  ngOnInit(): void {    
    this.selectedAddressIndex = this.auth.user && this.auth.user.addresses.findIndex(item => item.isDefault);
  }


  async addAddress() {
    let addressData = {
      label: 'Home',
      line1: this.newAddress.address1,
      line2: this.newAddress.address2,
      city: this.newAddress.city,
      state: this.newAddress.state,
      zip: this.newAddress.pincode.toString(),
      country: 'India',
      phone: this.newAddress.mobile.toString(),
      isDefault: true
    }

    await this.userService.addAddress(addressData);
  }


  async changeDefaultAddress(address){
    await this.auth.setDefaultAddress({addressId: address._id});
    this.selectedAddressIndex = this.auth.user && this.auth.user.addresses.findIndex(item => item.isDefault);
  }
}
