import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientButtonComponent } from './gradient-button.component';

describe('GradientButtonComponent', () => {
  let component: GradientButtonComponent;
  let fixture: ComponentFixture<GradientButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
