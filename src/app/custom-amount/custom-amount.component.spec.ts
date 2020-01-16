import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAmountComponent } from './custom-amount.component';

describe('CustomAmountComponent', () => {
  let component: CustomAmountComponent;
  let fixture: ComponentFixture<CustomAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
