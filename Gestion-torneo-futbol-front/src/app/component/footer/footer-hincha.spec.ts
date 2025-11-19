import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHincha } from './footer-hincha';

describe('FooterHincha', () => {
  let component: FooterHincha;
  let fixture: ComponentFixture<FooterHincha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterHincha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterHincha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
