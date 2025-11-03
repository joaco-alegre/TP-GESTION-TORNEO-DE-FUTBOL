import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetailsAdmin } from './jugador-details-admin';

describe('JugadorDetailsAdmin', () => {
  let component: JugadorDetailsAdmin;
  let fixture: ComponentFixture<JugadorDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetailsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorDetailsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
