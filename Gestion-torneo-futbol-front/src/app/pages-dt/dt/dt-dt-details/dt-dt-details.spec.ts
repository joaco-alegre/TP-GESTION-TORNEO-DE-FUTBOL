import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDtDetails } from './dt-dt-details';

describe('DtDtDetails', () => {
  let component: DtDtDetails;
  let fixture: ComponentFixture<DtDtDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDtDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtDtDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
