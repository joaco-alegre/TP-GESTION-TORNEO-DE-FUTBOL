import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtTeamGuard } from './dt-team-guards';

describe('DtTeamGuards', () => {
  let component: DtTeamGuard;
  let fixture: ComponentFixture<DtTeamGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtTeamGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtTeamGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
