import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtHome } from './dt-home';

describe('DtHome', () => {
  let component: DtHome;
  let fixture: ComponentFixture<DtHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
