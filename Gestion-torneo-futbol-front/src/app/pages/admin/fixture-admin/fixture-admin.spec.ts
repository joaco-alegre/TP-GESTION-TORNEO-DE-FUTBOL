import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureAdmin } from './fixture-admin';

describe('FixtureAdmin', () => {
  let component: FixtureAdmin;
  let fixture: ComponentFixture<FixtureAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
