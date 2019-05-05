import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMultiComponent } from './bar-multi.component';

describe('BarMultiComponent', () => {
  let component: BarMultiComponent;
  let fixture: ComponentFixture<BarMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
