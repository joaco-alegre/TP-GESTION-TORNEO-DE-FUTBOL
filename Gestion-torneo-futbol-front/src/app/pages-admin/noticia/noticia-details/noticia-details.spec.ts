import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaDetails } from './noticia-details';

describe('NoticiaDetails', () => {
  let component: NoticiaDetails;
  let fixture: ComponentFixture<NoticiaDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
