import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule,RouterLink,FormsModule]
})
export class CartComponent implements OnInit {

  cartItems = [];
  final_cart_value = 0;

  constructor(public globals: GlobalsService, public auth: AuthService, public router: Router, public userService: UserService) {
  }


  ngOnInit(): void {
    if (this.auth.user && this.auth.user.role == 'customer') {
      setTimeout(async () => {
        await this.userService.myCart();
        console.log(this.cartItems)
      }, 0);
    }
  }

  removeFromCart(product) {
    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.removeFromCart({ product: product.product })
    } else {
      this.userService.removeItemFromCartGuest(product);
    }
  }

  updateCart(product, changingQty) {
    console.log(product.qty, changingQty, product.productInfo.max_order_qty, product.productInfo.min_order_qty)
    if (changingQty == 1 && product.qty >= product.productInfo.max_order_qty) {
      this.globals.showErrorAlert("Maximum order quantity is " + product.productInfo.max_order_qty);
      return false;
    }
    if (changingQty == -1 && product.qty <= product.productInfo.min_order_qty) {
      this.globals.showErrorAlert("Minimum order quantity is " + product.productInfo.min_order_qty);
      return false;
    }

    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.addToCart({ product: product.product, qty: product.qty + changingQty })
    } else {
      this.userService.updateCartGuest(product, product.qty + changingQty);
    }
  }

  updateDirect(product, qty) {
    this.userService.updateCartGuest(product, qty.target.value);
  }

  emptyCart(){
    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.emptyCart();
    } else {
      this.userService.clearCartGuest();
    }
  }

}
