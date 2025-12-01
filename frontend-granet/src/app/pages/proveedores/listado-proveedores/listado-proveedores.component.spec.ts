import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProveedores } from './listado-proveedores';

describe('ListadoProveedores', () => {
  let component: ListadoProveedores;
  let fixture: ComponentFixture<ListadoProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoProveedores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
