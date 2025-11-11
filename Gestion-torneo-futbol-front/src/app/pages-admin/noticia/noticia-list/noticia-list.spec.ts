import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaList } from './noticia-list';

describe('NoticiaList', () => {
  let component: NoticiaList;
  let fixture: ComponentFixture<NoticiaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
