import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../providers/auth.service';
import { EventsService } from '../../providers/events.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { CommonModule } from '@angular/common';
import { FilterPipe, FilterPipeModule } from 'ngx-filter-pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule,FilterPipeModule,RouterLink,CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  recentlyAddedProducts = [];
  featuredProducts = [];
  todayDeals = [];
  blogs = [];
  recentBlogs = [];
  rating = 4;
  categories = [];
  totalSeconds = 0;
  private intervalId: any = null;
  timerDisplay = '';

  products = [];
  isLoading = false;

  bannerImages = [
    "assets/images/banner1.webp",
    "assets/images/banner2.webp",
    "assets/images/banner3.webp",
    "assets/images/banner4.webp",
    "assets/images/banner5.webp",
    "assets/images/banner6.webp",
  ]
  constructor(public globals: GlobalsService, public userService: UserService, public loader: LoadingBarService, public router: Router, public activatedRoute: ActivatedRoute, public event: EventsService, public auth: AuthService) { }


  ngOnInit(): void {
    setTimeout(async () => {
      this.getFeaturedProducts();
      this.getTopDealsProducts();
      this.getProducts();
      this.getProductsCategory();
      this.getBlogs();
      this.getRecentBlogs();
    }, 0);
    this.startCountdown(273, 21, 12, 52);
  }

  startCountdown(days: number, hours: number, minutes: number, seconds: number) {
    this.totalSeconds = this.convertToSeconds(days, hours, minutes, seconds);

    this.updateDisplay(); // initialize display immediately

    this.intervalId = setInterval(() => {
      if (this.totalSeconds <= 0) {
        this.clearTimer();
        return;
      }

      this.totalSeconds--;
      this.updateDisplay();
    }, 1000);
  }

  convertToSeconds(d: number, h: number, m: number, s: number): number {
    return d * 86400 + h * 3600 + m * 60 + s;
  }

  updateDisplay() {
    const d = Math.floor(this.totalSeconds / 86400);
    const h = Math.floor((this.totalSeconds % 86400) / 3600);
    const m = Math.floor((this.totalSeconds % 3600) / 60);
    const s = this.totalSeconds % 60;

    this.timerDisplay = `${d} : ${this.pad(h)} : ${this.pad(m)} : ${this.pad(s)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    // prevents memory leaks!
    this.clearTimer();
  }

  async getBlogs() {
    this.loader.start();
    try {
      let data = await this.userService.blogListing({ page: 1, perpage: 10000 });
      this.blogs = data.list;
    } catch (err) { }
    this.loader.complete();
    this.splitPairs(this.blogs, "blogs", 3);
  }

  async getRecentBlogs() {
    this.loader.start();
    try {
      let data = await this.userService.blogListing({ page: 1, perpage: 4 });
      this.recentBlogs = data.list;
    } catch (err) { }
    this.loader.complete();
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 9,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }

  splitPairs(arr, type, size) {


    let pairs = [];

    // Determine how many items per group
    let itemsPerGroup;
    if (this.globals.screenwidth <= 767) {
      itemsPerGroup = 1;   // mobile
    } else {
      itemsPerGroup = size;   // desktop
    }

    // Create the groups
    for (let i = 0; i < arr.length; i += itemsPerGroup) {
      const group = arr.slice(i, i + itemsPerGroup);
      pairs.push(group);
    }

    // Assign to the correct variable
    if (type === 'recently') {
      // this.recentlyAddedProducts = pairs;
    } else if (type === 'featured') {
      this.featuredProducts = pairs;
    } else if (type === 'today-deals') {
      this.todayDeals = pairs;
    } else if (type === 'blogs') {
      this.blogs = pairs;
    }
  }



  async getProducts() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000 });
      this.products = data.list;
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }

  async getProductsCategory() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, catId: '69281490ab2f7ce8496a332b' });
      this.recentlyAddedProducts = data.list;
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }

  async getFeaturedProducts() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, featured: true });
      this.splitPairs(data.list, 'featured', 6);
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }

  async getTopDealsProducts() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, topdeals: true });
      this.splitPairs(data.list, 'today-deals', 4);
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }


  addToCart(product) {
    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.addToCart({ product: product._id, qty: 1 })
    } else {

      this.userService.addToCartGuest(product);
    }
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
