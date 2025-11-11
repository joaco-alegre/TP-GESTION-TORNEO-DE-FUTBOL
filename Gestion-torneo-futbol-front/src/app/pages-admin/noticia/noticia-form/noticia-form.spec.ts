import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaForm } from './noticia-form';

describe('NoticiaForm', () => {
  let component: NoticiaForm;
  let fixture: ComponentFixture<NoticiaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
