import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoService } from './contacto-service';

describe('ContactoService', () => {
  let component: ContactoService;
  let fixture: ComponentFixture<ContactoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
