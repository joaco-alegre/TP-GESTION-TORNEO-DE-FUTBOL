import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoDetailsAdmin } from './equipo-details-admin';

describe('EquipoDetails', () => {
  let component: EquipoDetailsAdmin;
  let fixture: ComponentFixture<EquipoDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoDetailsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoDetailsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
