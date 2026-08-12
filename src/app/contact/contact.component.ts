import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { GlobalsService } from '../../providers/globals.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [RouterLink,CommonModule]
})
export class ContactComponent implements OnInit {

  constructor(public loader: LoadingBarService, public global: GlobalsService) { }

  ngOnInit(): void {}

  contactEmail(){
    this.loader.start();
    setTimeout(() => {
      this.global.showSuccessAlert('We will contact you shortly!')
    }, 3000);
    this.loader.complete();
  }

}
