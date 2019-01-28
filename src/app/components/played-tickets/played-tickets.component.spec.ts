import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedTicketsComponent } from './played-tickets.component';

describe('PlayedTicketsComponent', () => {
  let component: PlayedTicketsComponent;
  let fixture: ComponentFixture<PlayedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
