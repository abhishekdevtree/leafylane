import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  imports: [CommonModule,FormsModule]
})
export class PasswordComponent implements OnInit {

  password = {
    current : '',
    new : '',
    confirm : ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
