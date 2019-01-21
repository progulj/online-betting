import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingOfferComponent } from './betting-offer.component';

describe('BettingOfferComponent', () => {
  let component: BettingOfferComponent;
  let fixture: ComponentFixture<BettingOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
