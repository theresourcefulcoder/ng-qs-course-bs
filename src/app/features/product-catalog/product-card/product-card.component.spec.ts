import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      code: 'BOW-PROD-1',
      name: 'Bowflex Xtreme 2 SE Home Gym',
      description: 'The Bowflex Xtreme® 2 SE.',
      price: 1599,
      cost: 1199.25,
      supplierId: 1,
      imageUrl: './assets/images/products/bowflex_xtreme2_se_home_gym.webp',
      packageDimensions: '53x49x83.25',
      packageWeight: 185,
      rating: 4.75,
      category: 'Home Gyms',
      active: true
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
