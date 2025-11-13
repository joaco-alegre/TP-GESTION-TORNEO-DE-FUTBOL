import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtJugadorDetails } from './dt-jugador-details';

describe('DtJugadorDetails', () => {
  let component: DtJugadorDetails;
  let fixture: ComponentFixture<DtJugadorDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtJugadorDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtJugadorDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
