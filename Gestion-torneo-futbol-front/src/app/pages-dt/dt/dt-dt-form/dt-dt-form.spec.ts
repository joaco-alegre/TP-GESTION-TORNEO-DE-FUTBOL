import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDtForm } from './dt-dt-form';

describe('DtDtForm', () => {
  let component: DtDtForm;
  let fixture: ComponentFixture<DtDtForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDtForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtDtForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
