import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../providers/auth.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule,FormsModule,RouterLink]
})
export class PaymentComponent implements OnInit {

  selectedIndex = 0;
  showTransactionPopup = false;

  constructor(public userService: UserService, public globalService: GlobalsService, public loader: LoadingBarService, public auth: AuthService,public router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.user && this.auth.user.role == 'customer') {
      setTimeout(async () => {
        await this.userService.myCart();
        if (this.userService.cart.items.length == 0) {
          this.router.navigate(['/cart']);
        }
      }, 0);
    }

  }

  async placeOrder() {
    this.loader.start();
    try {
      await this.userService.placeOrder();
      this.showTransactionPopup = true;
    } catch (error) {

    }
    this.loader.complete();
  }

}
