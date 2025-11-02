import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtList } from './dt-list';

describe('DtList', () => {
  let component: DtList;
  let fixture: ComponentFixture<DtList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
