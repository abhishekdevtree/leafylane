import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  imports: [CommonModule,FormsModule]
})
export class AccountInfoComponent implements OnInit {

  mainMenu: boolean = true;
  editmenu: boolean = false;
  imgSrc = 'assets/images/userImg.png';
  fileToUpload: any;
  imageUrl: any = 'assets/images/userImg.png';
  defAddress:any = '';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.defaultAddress();
  }

  hideAllDiv() {
    this.editmenu = false;
    this.mainMenu = false;
  }

  showMainMenu() {
    this.hideAllDiv();
    this.mainMenu = !this.mainMenu
  }

  showEditMenu() {
    this.hideAllDiv();
    this.editmenu = !this.editmenu;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  defaultAddress() {
    this.defAddress = this.auth?.user?.addresses?.find(a => a.isDefault) || null;
    console.log(this.defAddress);
    
  }

}
