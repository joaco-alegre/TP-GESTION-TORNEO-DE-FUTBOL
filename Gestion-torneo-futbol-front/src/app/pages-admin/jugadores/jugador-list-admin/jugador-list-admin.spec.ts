import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorListAdmin } from './jugador-list-admin';

describe('JugadorListAdmin', () => {
  let component: JugadorListAdmin;
  let fixture: ComponentFixture<JugadorListAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorListAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorListAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
