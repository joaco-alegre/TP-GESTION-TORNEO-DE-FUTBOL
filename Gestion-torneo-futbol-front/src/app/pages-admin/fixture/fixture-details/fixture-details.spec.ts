import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureDetails } from './fixture-details';

describe('FixtureDetails', () => {
  let component: FixtureDetails;
  let fixture: ComponentFixture<FixtureDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
