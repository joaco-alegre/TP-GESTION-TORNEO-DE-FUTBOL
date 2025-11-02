import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorAdmin } from './jugador-admin';

describe('JugadorAdmin', () => {
  let component: JugadorAdmin;
  let fixture: ComponentFixture<JugadorAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
