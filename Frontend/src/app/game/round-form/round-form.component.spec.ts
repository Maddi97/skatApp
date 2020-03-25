import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFormComponent } from './round-form.component';

describe('RoundFormComponent', () => {
  let component: RoundFormComponent;
  let fixture: ComponentFixture<RoundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
