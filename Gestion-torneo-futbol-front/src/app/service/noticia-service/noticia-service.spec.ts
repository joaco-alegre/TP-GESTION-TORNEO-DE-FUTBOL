import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaService } from './noticia-service';

describe('NoticiaService', () => {
  let component: NoticiaService;
  let fixture: ComponentFixture<NoticiaService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
