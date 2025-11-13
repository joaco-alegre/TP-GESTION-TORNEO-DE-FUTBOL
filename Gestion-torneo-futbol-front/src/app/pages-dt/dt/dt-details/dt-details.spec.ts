import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDetails } from './dt-details';

describe('DtDetails', () => {
  let component: DtDetails;
  let fixture: ComponentFixture<DtDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
