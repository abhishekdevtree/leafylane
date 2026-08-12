import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../providers/user-service';
import { GlobalsService } from '../../providers/globals.service';
import { AuthService } from '../../providers/auth.service';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MyNgImgMagnifierModule } from './../my-ng-img-magnifier/my-ng-img-magnifier-module';
import { NgxImageZoomModule } from 'ngx-image-zoom';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CommonModule, FilterPipeModule, ReactiveFormsModule, NgxImageZoomModule, MyNgImgMagnifierModule, CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit {

  targetProductId: any;
  menu: boolean = true;
  description: boolean = true;
  review: boolean = true;
  bannerImg: string = "";
  largerImg: string = "";
  quantity = 1;
  inCart: boolean = false;
  wishList: boolean = false;
  imgId = 0;
  colorId = 0;
  starRating = 4;
  isLoading = false;


  // addToCart = {
  //   qyt: 0,
  //   added: false
  // }

  reviewImg = [];
  rating = 4;
  products = [];
  productsList = [];

  fileToUpload: any;
  imageUrl: any = 'assets/images/userImg.png';


  public form: FormGroup;

  constructor(public router: Router, public global: GlobalsService, public userService: UserService, public loader: LoadingBarService, public activatedRoute: ActivatedRoute, public auth: AuthService) {
    // this.form = this.fb.group({
    //   rating: ['4', Validators.required]
    // });
  }

  userReview = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    starRating: new FormControl(''),
  })

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe(params => {
      this.targetProductId = params['productId'];
    })
    setTimeout(async () => {
      await this.getProducts();
      await this.getProductsList();
    }, 0);
  }

  async getProducts() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, id: this.targetProductId });
      this.products = data.list;
      console.log(this.products);
      this.bannerImg = this.products[0].images[0].regular;
      this.largerImg = this.products[0].images[0].regular;
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }

  async getProductsList() {
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, catId: this.products[0].categoryInfo._id });
      let filterData = data.list.filter(
        (p: any) => p._id !== this.products[0]._id
      );
      this.splitPairs(filterData)
    } catch (err) { }
    this.loader.complete();
  }

  splitPairs(arr) {
    let pairs = [];

    // Determine how many items per group
    let itemsPerGroup;
    if (this.global.screenwidth <= 767) {
      itemsPerGroup = 1;   // mobile
    } else {
      itemsPerGroup = 4;   // desktop
    }

    // Create the groups
    for (let i = 0; i < arr.length; i += itemsPerGroup) {
      const group = arr.slice(i, i + itemsPerGroup);
      pairs.push(group);
    }
    this.productsList = pairs;
  };


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  productQuantity(type: any) {
    if (type == "increase") {
      this.quantity = this.quantity + 1;
    }
    if (type == "decrease" && this.quantity > 0) {
      this.quantity = this.quantity - 1;
    }
  }

  setBannerImg(src: string, ids: any) {
    console.log(ids, src)
    this.bannerImg = this.products[0].images[ids].regular;
    this.largerImg = this.products[0].images[ids].regular;
    this.imgId = ids;
  }

  addToCart(product) {
    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.addToCart({ product: product._id, qty: 1 })
    } else {
      console.log(product);

      this.userService.addToCartGuest(product);
    }
  }

  hidealldiv() {
    this.description = false;
    this.review = false;
  }

  showDescription() {
    this.hidealldiv();
    this.description = true;
  }
  showReview() {
    this.hidealldiv();
    this.review = true;
  }

  addWishlist() {
    this.wishList = !this.wishList;
    if (this.wishList == true) {
      this.global.showSuccessAlert('Item Added To Wishlist');
    }
    if (this.wishList == false) {
      this.global.showErrorAlert('Item Removed From Wishlist');
    }
  }

  updateReview() {
    console.log(this.userReview.value)
  }
  updateRating() {
    console.log(this.form.value.rating)
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.reviewImg.push(this.imageUrl);
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload);
  }

  deleteReviewImg(i) {
    console.log(i);
    this.reviewImg.splice(i, 1);
  }

  changeRating(value) {
    if (this.rating == 1 && value == 1) {
      this.rating = 0;
    }
    else {
      this.rating = value;
    }
  }
}
