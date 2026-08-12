import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { GlobalsService } from '../../providers/globals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterLink]
})
export class FooterComponent implements OnInit {

  constructor(public loader: LoadingBarService, public global: GlobalsService) { }

  ngOnInit(): void {}

  subscribeEmail(){
    this.loader.start();
    setTimeout(() => {
      this.global.showSuccessAlert('Email subscribed successfully!')
    }, 3000);
    this.loader.complete();
  }
}
