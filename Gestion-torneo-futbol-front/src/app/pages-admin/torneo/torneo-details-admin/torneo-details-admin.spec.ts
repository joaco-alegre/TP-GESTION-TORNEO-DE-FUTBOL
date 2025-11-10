import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoDetailsAdmin } from './torneo-details-admin';

describe('TorneoDetails', () => {
  let component: TorneoDetailsAdmin;
  let fixture: ComponentFixture<TorneoDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoDetailsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoDetailsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
