import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorLayoutDt } from './contenedor-layout-dt';

describe('ContenedorLayoutDt', () => {
  let component: ContenedorLayoutDt;
  let fixture: ComponentFixture<ContenedorLayoutDt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorLayoutDt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorLayoutDt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
