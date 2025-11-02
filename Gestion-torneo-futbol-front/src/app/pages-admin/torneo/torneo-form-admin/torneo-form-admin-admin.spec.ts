import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoFormAdmin } from './torneo-form-admin';

describe('TorneoFormAdmin', () => {
  let component: TorneoFormAdmin;
  let fixture: ComponentFixture<TorneoFormAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoFormAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoFormAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
