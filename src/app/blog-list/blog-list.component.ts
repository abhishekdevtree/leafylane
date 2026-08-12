import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../providers/auth.service';
import { EventsService } from '../../providers/events.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { FilterPipeModule } from 'ngx-filter-pipe';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: [
    './blog-list.component.css',
    './blog-list.component.scss'
  ],
  imports: [RouterLink,CommonModule,FilterPipeModule,CarouselModule]
})

export class BlogListComponent implements OnInit {

  userImg= "assets/images/user.png";
  username= "admin";
  blogs = [];
  recentBlogs = [];
  isLoading = false;
  search = "";

  filterMenu:boolean = false;

  constructor(public globals: GlobalsService, public userService: UserService, public loader: LoadingBarService, public router: Router, public activatedRoute: ActivatedRoute, public event: EventsService,) {
  
   }

  ngOnInit(): void {
    this.getBlogs();
    this.getRecentBlogs();
  }


  async getBlogs() {
    this.isLoading = true;
    this.loader.start();
    try {
      let data = await this.userService.blogListing({page: 1, perpage: 10000});
      this.blogs = data.list;
      console.log(this.blogs);
    } catch(err) {}
    this.loader.complete();
    this.isLoading = false;
  }

  async getRecentBlogs() {
    this.loader.start();
    try {
      let data = await this.userService.blogListing({page: 1, perpage: 4});
      this.recentBlogs = data.list;
      console.log(this.recentBlogs);
    } catch(err) {}
    this.loader.complete();
  }

  showFilters(){
    this.filterMenu = !this.filterMenu;
    console.log(this.filterMenu);
  }

  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }


}
