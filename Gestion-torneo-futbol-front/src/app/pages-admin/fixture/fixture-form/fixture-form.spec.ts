import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureForm } from './fixture-form';

describe('FixtureForm', () => {
  let component: FixtureForm;
  let fixture: ComponentFixture<FixtureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
