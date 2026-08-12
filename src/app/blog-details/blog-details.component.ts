import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../providers/auth.service';
import { EventsService } from '../../providers/events.service';
import { GlobalsService } from '../../providers/globals.service';
import { UserService } from '../../providers/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
  imports: [CommonModule,RouterLink,CarouselModule]
})
export class BlogDetailsComponent implements OnInit {

  targetBlogId: any;

  blog = [];
  recentBlogs = [];
  filterMenu:boolean = false;
  headerTitle: any;
  public form: FormGroup;
  isLoading = false;

  constructor(public globals: GlobalsService, public userService: UserService, public loader: LoadingBarService, public router: Router, public activatedRoute: ActivatedRoute, public event: EventsService,private fb: FormBuilder) {
    this.form = this.fb.group({
      rating: ['']
    });
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe(params => {
    this.targetBlogId = params['blogId'];})
    this.getBlog();
    this.getRecentBlogs();
  }

  async getBlog() {
    this.isLoading = true;
    let contentId:any = {
      id: this.targetBlogId,
    }
    this.loader.start();
    try {
      let data = await this.userService.blogListing(contentId);
      this.blog = data.list;
    } catch(err) {}
    this.loader.complete();
    this.isLoading = false;
  }

  async getRecentBlogs() {
    this.loader.start();
    try {
      let data = await this.userService.blogListing({page: 1, perpage: 4});
      this.recentBlogs = data.list;
      console.log(this.recentBlogs,"recent blogs");
    } catch(err) {}
    this.loader.complete();
  }

  updateRating(){
    console.log(this.form.value.rating)
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
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


}
