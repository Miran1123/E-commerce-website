import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductvaritiesComponent } from './productvarities.component';

describe('ProductvaritiesComponent', () => {
  let component: ProductvaritiesComponent;
  let fixture: ComponentFixture<ProductvaritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductvaritiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductvaritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
