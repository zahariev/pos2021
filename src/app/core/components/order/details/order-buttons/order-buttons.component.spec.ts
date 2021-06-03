import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderButtonsComponent } from './order-buttons.component';

describe('OrderButtonsComponent', () => {
  let component: OrderButtonsComponent;
  let fixture: ComponentFixture<OrderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
