import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorLayoutAdmin } from './contenedor-layout-admin';

describe('ContenedorLayoutAdmin', () => {
  let component: ContenedorLayoutAdmin;
  let fixture: ComponentFixture<ContenedorLayoutAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorLayoutAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorLayoutAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
