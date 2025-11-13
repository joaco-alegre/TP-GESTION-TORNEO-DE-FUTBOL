import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtJugadorList } from './dt-jugador-list';

describe('DtJugadorList', () => {
  let component: DtJugadorList;
  let fixture: ComponentFixture<DtJugadorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtJugadorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtJugadorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
