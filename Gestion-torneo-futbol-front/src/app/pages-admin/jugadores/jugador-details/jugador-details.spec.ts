import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetails } from './jugador-details';

describe('JugadorDetails', () => {
  let component: JugadorDetails;
  let fixture: ComponentFixture<JugadorDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
