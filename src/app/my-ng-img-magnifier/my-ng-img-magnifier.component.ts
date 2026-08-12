import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MyNgImgMagnifierService } from './my-ng-img-magnifier.service';

@Component({
  selector: 'lib-my-ng-img-magnifier',
  standalone: false,
  templateUrl: './my-ng-img-magnifier.component.html',
  styleUrls: ['./my-ng-img-magnifier.component.css'],
  providers: [MyNgImgMagnifierService],
})
export class MyNgImgMagnifierComponent {

  @Input() thumbImage!: string;
  @Input() fullImage: string;
  @Input() top: number;
  @Input() right: number;
  @Input() lensWidth: number;
  @Input() lensHeight: number;
  @Input() resultWidth: number;
  @Input() resultHeight: number;
  @Input() imgWidth: any;
  @Input() imgHeight: any;
  @ViewChild('myresult', { static: false }) resultID!: ElementRef;
  @ViewChild('myimage', { static: true }) imgID!: ElementRef;
  @ViewChild('zoomDiv', { static: true }) zoomDiv!: ElementRef;
  @Input() showZoom: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
      this.thumbImage = '';
      this.fullImage = '';
      this.top = 2;
      this.right = 1;
      this.lensWidth = 150;
      this.lensHeight = 150;
      this.resultWidth = 35;
      this.resultHeight = 60;
      this.imgWidth = 300;
      this.imgHeight = 300;
      this.showZoom = false;
  }
  ngOnInit() {
  }
  async imageZoom() {
      this.showLensDiv();
      var img:any, lens:any, result:any, cx:any, cy:any;
      this.showZoom = true;
      this.changeDetectorRef.detectChanges();
      result = this.resultID.nativeElement;
      result.style.top = this.top + '%';
      result.style.right = this.right + '%';
      result.style.width = this.resultWidth + '%';
      result.style.height = this.resultHeight + '%';
      
      img = this.imgID.nativeElement;
      lens = this.zoomDiv.nativeElement;
      if (img.width > (img.height * 2)) {
          lens.style.width = (img.width / 3) + "px";
          lens.style.height = (img.height / 1) + "px";
      }
      else if (img.height > (img.width * 2)) {
          lens.style.width = (img.width / 1) + "px";
          lens.style.height = (img.height / 3) + "px";
      }
      else {
          lens.style.width = this.lensWidth + "px";
          lens.style.height = this.lensHeight + "px";
      }
      lens.style.opacity = 1;
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
      result.style.backgroundImage = "url('" + this.fullImage + "')";
      result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("mousemove", moveLens);
      lens.addEventListener("touchmove", moveLens);
      img.addEventListener("touchmove", moveLens);
      function moveLens(e:any) {
          var pos, x, y;
          e.preventDefault();
          pos = getPointerPosition(e);
          x = pos.x - (lens.offsetWidth / 2);
          y = pos.y - (lens.offsetHeight / 2);
          if (x > img.width - lens.offsetWidth) {
              x = img.width - lens.offsetWidth;
          }
          if (x < 0) {
              x = 0;
          }
          if (y > img.height - lens.offsetHeight) {
              y = img.height - lens.offsetHeight;
          }
          if (y < 0) {
              y = 0;
          }
          lens.style.left = (x + 5) + "px";
          lens.style.top = (y + 5) + "px";
          result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
      }
      function getPointerPosition(e:any) {
          var a, x = 0, y = 0;
          e = e || window.event;
          a = img.getBoundingClientRect();
          x = e.pageX - a.left;
          y = e.pageY - a.top;
          x = x - window.pageXOffset;
          y = y - window.pageYOffset;
          return { x: x, y: y };
      }
  }
  showZoomWin() {
      this.showZoom = true;
  }
  hideZoomWin() {
      this.showZoom = false;
      this.zoomDiv.nativeElement.style.opacity = 0;
      this.zoomDiv.nativeElement.style.display = 'none';
  }
  showLensDiv() {
      this.zoomDiv.nativeElement.style.display = 'block';
  }
}

