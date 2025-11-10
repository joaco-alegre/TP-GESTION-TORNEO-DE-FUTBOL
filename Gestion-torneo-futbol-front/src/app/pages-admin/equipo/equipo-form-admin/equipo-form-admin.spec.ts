import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoFormAdmin } from './equipo-form-admin';

describe('EquipoForm', () => {
  let component: EquipoFormAdmin;
  let fixture: ComponentFixture<EquipoFormAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoFormAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoFormAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
