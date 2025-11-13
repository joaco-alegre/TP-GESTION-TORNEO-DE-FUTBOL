import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtForm } from './dt-form';

describe('DtForm', () => {
  let component: DtForm;
  let fixture: ComponentFixture<DtForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
