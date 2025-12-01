import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInventarios } from './listado-inventarios';

describe('ListadoInventarios', () => {
  let component: ListadoInventarios;
  let fixture: ComponentFixture<ListadoInventarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInventarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoInventarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
