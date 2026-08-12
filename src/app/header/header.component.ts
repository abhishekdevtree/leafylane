import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../providers/user-service';
import { GlobalsService } from '../../providers/globals.service';
import { AuthService } from '../../providers/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs'
import { map, filter, catchError, mergeMap, debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterLink, FormsModule]
})
export class HeaderComponent implements OnInit {
  categories = [];
  isBrowser = false;
  showMenu: boolean = false;
  suggestionSkeletonLoader = false;
  skeletonDemoLoading: any[] = [1, 2, 3, 4, 5, 6, 7];
  suggestedProducts: any[] = [];
  loadMoreResultTemplate = false;
  @ViewChild('searchInputElement') searchInputElement: ElementRef;
  private debouncedInputSubscription: Subscription = new Subscription();


  constructor(@Inject(PLATFORM_ID) private platformId: any, public router: Router, public global: GlobalsService, public userService: UserService, public loader: LoadingBarService, public auth: AuthService) { }

  ngOnInit(): void {
    this.getCategory();
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      console.log(this.userService.cart.items, "Cart");
    }

  }

  responsiveMenu() {
    this.showMenu = !this.showMenu;
    let accordians = document.querySelectorAll(".accordion-collapse");
    accordians.forEach((ele) => {
      if (ele.classList.contains('show')) {
        ele.classList.remove('show');
      }
    })
  }

  async getCategory() {
    this.loader.start();
    try {
      let data = await this.userService.categoryListing({ page: 1, perpage: 10000 });
      this.categories = data.list;
      this.global.categories = this.categories;
    } catch (err) { }
    this.loader.complete();
  }

  redirectBlog() {

  }


  // FOR SEARCH

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    const input = this.searchInputElement.nativeElement;
    const obs = fromEvent(this.searchInputElement.nativeElement, 'keyup');
    const input$ = obs.pipe(map(i => i));
    const debouncedInput = input$.pipe(debounceTime(500));
    this.debouncedInputSubscription.add(debouncedInput.subscribe(val => {
      this.performSearch();

    }));
  }

  setSearchTextAndPerformSearch(searchText) {
    this.global.searchString = searchText;
    setTimeout(() => {
      this.performSearch();
    });
  }



  getSearchResultWithKeywords(keyword) {
    // console.log(keyword);
    this.router.navigate(['/products/' + keyword]);
  }

  checkSearchEmpty() {
    // if (this.globals.searchString != '') {
    //   this.clearIcon = true;
    // } else {
    //   this.clearIcon = false;
    // }
  }

  performSearch() {
    if (this.global.searchString.length < 2) {
      this.global.searchSuggestion.set(false);
      this.suggestionSkeletonLoader = false;
      return false;
    } else {
      this.global.searchSuggestion.set(true);
      this.suggestionSkeletonLoader = true;
      this.getProductSuggestion();
    }
  }

  getProductSuggestion() {
    this.userService.productListing({ perpage: 1000, page: 1, q: this.global.searchString }).then(data => {
      if (data) {
        this.suggestionSkeletonLoader = false;

        if (data.list.length > 7) {
          const limitedList = data.list.slice(0, 7);
          this.suggestedProducts = limitedList;
          this.loadMoreResultTemplate = true;
        } else {
          this.loadMoreResultTemplate = false;
          this.suggestedProducts = data.list;
        }


        //console.log(this.suggestedKeywords);

      } else {
        this.suggestionSkeletonLoader = false;
      }
    }, err => {
      this.suggestionSkeletonLoader = false;
    });
  }
}
