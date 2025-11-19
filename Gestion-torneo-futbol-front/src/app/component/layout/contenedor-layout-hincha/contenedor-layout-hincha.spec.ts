import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorLayoutHincha } from './contenedor-layout-hincha';

describe('ContenedorLayoutHincha', () => {
  let component: ContenedorLayoutHincha;
  let fixture: ComponentFixture<ContenedorLayoutHincha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorLayoutHincha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorLayoutHincha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
