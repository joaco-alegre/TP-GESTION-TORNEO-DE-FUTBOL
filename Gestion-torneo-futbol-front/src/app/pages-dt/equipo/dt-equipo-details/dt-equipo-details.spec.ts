import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtEquipoDetails } from './dt-equipo-details';

describe('DtEquipoDetails', () => {
  let component: DtEquipoDetails;
  let fixture: ComponentFixture<DtEquipoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtEquipoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtEquipoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
