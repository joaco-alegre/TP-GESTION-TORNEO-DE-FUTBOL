import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoListAdmin } from './torneo-list-admin';

describe('TorneoListAdmin', () => {
  let component: TorneoListAdmin;
  let fixture: ComponentFixture<TorneoListAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoListAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoListAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
