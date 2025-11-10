import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorLibreList } from './jugador-libre-list';

describe('JugadorLibreList', () => {
  let component: JugadorLibreList;
  let fixture: ComponentFixture<JugadorLibreList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorLibreList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorLibreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
