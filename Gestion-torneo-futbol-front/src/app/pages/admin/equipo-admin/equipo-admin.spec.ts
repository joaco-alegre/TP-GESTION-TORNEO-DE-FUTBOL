import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoAdmin } from './equipo-admin';

describe('EquipoAdmin', () => {
  let component: EquipoAdmin;
  let fixture: ComponentFixture<EquipoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
