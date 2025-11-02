import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoAdmin } from './torneo-admin';

describe('TorneoAdmin', () => {
  let component: TorneoAdmin;
  let fixture: ComponentFixture<TorneoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
