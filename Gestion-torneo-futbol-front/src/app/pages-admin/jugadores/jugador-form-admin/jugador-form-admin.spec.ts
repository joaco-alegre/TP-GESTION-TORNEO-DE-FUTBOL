import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorFormAdmin } from './jugador-form-admin';

describe('JugadorFormAdmin', () => {
  let component: JugadorFormAdmin;
  let fixture: ComponentFixture<JugadorFormAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorFormAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorFormAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
