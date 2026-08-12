import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../providers/user-service';
import { GlobalsService } from '../../providers/globals.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss'],
  imports: [CommonModule, RouterLink, FilterPipeModule]
})
export class CategoryListingComponent implements OnInit {


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

  activeCategory: any = null;
  bannerImage: string = 'none';

  constructor(public router: Router, public global: GlobalsService, public userService: UserService, public loader: LoadingBarService, public activatedRoute: ActivatedRoute, public auth: AuthService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.activatedRoute.params.subscribe(async params => {
      this.targetCategoryId = params['categoryId'];

      // Wait until products are loaded
      await this.getProducts();

      setTimeout(() => {
        // 1. Find the category (no matter how deep)
        this.activeCategory = this.findCategoryById(
          this.targetCategoryId,
          this.global.categories
        );



        // Set banner image
        this.bannerImage = this.activeCategory?.images?.length
          ? `url(${this.activeCategory.images[0].regular})`
          : 'none';

      }, 0);
    });
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
    if (this.products?.length % 9 > 0) {
      this.totalPages = Math.trunc(this.products?.length / 9) + 1;
    }
    else {
      this.totalPages = Math.trunc(this.products?.length / 9);
    }
  }

  changePage(page) {
    this.pageNumber = page;
  }

  pages(i) {
    return new Array(i);
  }


  isInCart(id: string) {
    return this.userService.cart?.items?.some(c => c.product === id);
  }

  findCategoryById(id: string, list: any[]): any {
    for (const item of list) {
      if (item._id === id) return item;

      if (item.children && item.children?.length > 0) {
        const found = this.findCategoryById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  }



  getFormattedHeading(html: unknown): SafeHtml {
    const formatted = this.transformHeading(html);

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }

  transformHeading(html: unknown): string {
    // Handle undefined, null, non-string values
    if (typeof html !== 'string' || !html.trim()) {
      return '';
    }

    // Remove HTML tags
    const rawText = html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!rawText) {
      return '';
    }

    const words = rawText.split(' ');

    // If there are fewer than 4 words,
    // just return the original HTML
    if (words.length < 4) {
      return html;
    }

    const first = words[0];
    const second = `<span>${words[1]}</span>`;
    const third = `<span>${words[2]}</span>`;
    const rest = words.slice(3).join(' ');

    return `<h1>${first} ${second}<br>${third} ${rest}</h1>`;
  }

}
