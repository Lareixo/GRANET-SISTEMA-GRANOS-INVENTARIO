import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProveedor } from './form-proveedor';

describe('FormProveedor', () => {
  let component: FormProveedor;
  let fixture: ComponentFixture<FormProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProveedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProveedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
