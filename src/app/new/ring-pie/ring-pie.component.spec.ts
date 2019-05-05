import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingPieComponent } from './ring-pie.component';

describe('RingPieComponent', () => {
  let component: RingPieComponent;
  let fixture: ComponentFixture<RingPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
