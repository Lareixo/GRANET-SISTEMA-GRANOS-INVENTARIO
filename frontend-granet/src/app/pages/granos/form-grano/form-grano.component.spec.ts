import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGrano } from './form-grano';

describe('FormGrano', () => {
  let component: FormGrano;
  let fixture: ComponentFixture<FormGrano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGrano]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGrano);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
