import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtAdmin } from './dt-admin';

describe('DtAdmin', () => {
  let component: DtAdmin;
  let fixture: ComponentFixture<DtAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
