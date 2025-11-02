import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoDetails } from './torneo-details-admin';

describe('TorneoDetails', () => {
  let component: TorneoDetails;
  let fixture: ComponentFixture<TorneoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
