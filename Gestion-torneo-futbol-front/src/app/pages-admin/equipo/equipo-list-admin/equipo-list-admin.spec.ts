import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoListAdmin } from './equipo-list-admin';

describe('EquipoList', () => {
  let component: EquipoListAdmin;
  let fixture: ComponentFixture<EquipoListAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoListAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoListAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
