import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtListAdmin } from './dt-list-admin';

describe('DtListAdmin', () => {
  let component: DtListAdmin;
  let fixture: ComponentFixture<DtListAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtListAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtListAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
