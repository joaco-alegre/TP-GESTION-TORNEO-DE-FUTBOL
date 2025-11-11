import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContacto } from './panel-contacto';

describe('PanelContacto', () => {
  let component: PanelContacto;
  let fixture: ComponentFixture<PanelContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
