import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../providers/user-service';
import { GlobalsService } from '../../providers/globals.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FilterPipe, FilterPipeModule } from 'ngx-filter-pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [RouterLink, CommonModule,FilterPipeModule]
})
export class ProductsComponent implements OnInit {


  productListOne: boolean = true;
  productListThree: boolean = false;
  filterMenu: boolean = false;
  productId: any = 123456789;
  targetCategoryId = ''
  products = [];
  rating = 4;
  isLoading = false;
  totalPages = 0;
  pageNumber = 0;
  productOnPage = 0;

  constructor(public router: Router, public global: GlobalsService, public userService: UserService, public loader: LoadingBarService, public activatedRoute: ActivatedRoute, public auth: AuthService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe(params => {
      this.targetCategoryId = params['categoryId'];
      this.getProducts();
    })

  }

  async getProducts() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.productListing({ page: 1, perpage: 10000, catId: this.targetCategoryId });
      this.products = data.list;
      this.calculateTotalPages();
    } catch (err) { }
    this.loader.complete();
    this.isLoading = false;
  }

  hideProduct() {
    this.productListOne = false;
    this.productListThree = false;
  }

  showListOne() {
    this.hideProduct();
    this.productListOne = true;
  }
  showListThree() {
    this.hideProduct();
    this.productListThree = true;
  }

  showFilters() {
    this.filterMenu = !this.filterMenu;
  }

  addToCart(product) {
    if (this.auth.user && this.auth.user.role == 'customer') {
      this.userService.addToCart({ product: product._id, qty: 1 })
    } else {
      this.userService.addToCartGuest(product);
    }
  }

  calculateTotalPages() {
    if (this.products.length % 9 > 0) {
      this.totalPages = Math.trunc(this.products.length / 9) + 1;
    }
    else {
      this.totalPages = Math.trunc(this.products.length / 9);
    }
  }

  changePage(page) {
    this.pageNumber = page;
  }

  pages(i) {
    return new Array(i);
  }


  getFormattedHeading(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.transformHeading(html));
  }

  transformHeading(html: string): string {
    // Remove existing tags and keep text only
    const rawText = html.replace(/<[^>]+>/g, ' ').trim();
    const words = rawText.split(/\s+/);

    if (words.length < 4) return html;

    // Build structure
    const first = words[0];                     // Suculent
    const second = `<span>${words[1]}</span>`;  // <span>Garden</span>

    // Force line break for 2nd line
    const third = `<span>${words[2]}</span>`;   // <span>Gift</span>
    const rest = words.slice(3).join(' ');      // Boxes.

    return `<h1>${first} ${second}<br>${third} ${rest}</h1>`;
  }

}
