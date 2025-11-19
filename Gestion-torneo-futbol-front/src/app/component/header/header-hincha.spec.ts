import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHincha } from './header-hincha';

describe('HeaderHincha', () => {
  let component: HeaderHincha;
  let fixture: ComponentFixture<HeaderHincha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHincha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHincha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
