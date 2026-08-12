import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '../../providers/globals.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  imports: [CommonModule,RouterLink,]
})
export class WishlistComponent implements OnInit {

  private toastr = inject(ToastrService); 

  arr = [
    "assets/images/flower.jpg",
    "assets/images/flower2.jpg",
    "assets/images/flower3.jpg",
    "assets/images/flower4.jpg",
    "assets/images/flower5.jpg",
  ];

  constructor(public router: Router,public global: GlobalsService) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.error('Item Removed From Wishlist');
    // this.global.showErrorAlert('Item Removed From Wishlist');
  }

}
