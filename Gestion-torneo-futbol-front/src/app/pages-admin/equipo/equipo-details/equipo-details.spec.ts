import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoDetails } from './equipo-details';

describe('EquipoDetails', () => {
  let component: EquipoDetails;
  let fixture: ComponentFixture<EquipoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
