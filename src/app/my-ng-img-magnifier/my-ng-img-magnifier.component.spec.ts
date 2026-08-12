import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNgImgMagnifierComponent } from './my-ng-img-magnifier.component';

describe('MyNgImgMagnifierComponent', () => {
  let component: MyNgImgMagnifierComponent;
  let fixture: ComponentFixture<MyNgImgMagnifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNgImgMagnifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNgImgMagnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
