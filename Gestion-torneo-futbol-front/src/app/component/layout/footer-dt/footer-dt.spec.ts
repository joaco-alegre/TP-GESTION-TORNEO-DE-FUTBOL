import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDt } from './footer-dt';

describe('FooterDt', () => {
  let component: FooterDt;
  let fixture: ComponentFixture<FooterDt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterDt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
