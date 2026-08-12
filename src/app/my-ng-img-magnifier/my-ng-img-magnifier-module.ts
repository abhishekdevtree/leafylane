// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class MyNgImgMagnifierModule { }


import { NgModule } from '@angular/core';
import { MyNgImgMagnifierComponent } from './my-ng-img-magnifier.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MyNgImgMagnifierComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyNgImgMagnifierComponent
  ]
})
export class MyNgImgMagnifierModule { }

