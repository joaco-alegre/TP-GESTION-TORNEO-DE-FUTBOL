import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorList } from './jugador-list';

describe('JugadorList', () => {
  let component: JugadorList;
  let fixture: ComponentFixture<JugadorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
