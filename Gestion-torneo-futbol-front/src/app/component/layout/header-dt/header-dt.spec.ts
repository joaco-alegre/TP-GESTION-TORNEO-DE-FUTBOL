import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDt } from './header-dt';

describe('HeaderDt', () => {
  let component: HeaderDt;
  let fixture: ComponentFixture<HeaderDt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
