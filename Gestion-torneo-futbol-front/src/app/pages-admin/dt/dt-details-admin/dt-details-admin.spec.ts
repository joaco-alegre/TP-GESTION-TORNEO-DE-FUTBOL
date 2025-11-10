import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDetailsAdmin } from './dt-details-admin';

describe('DtDetailsAdmin', () => {
  let component: DtDetailsAdmin;
  let fixture: ComponentFixture<DtDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDetailsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtDetailsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
