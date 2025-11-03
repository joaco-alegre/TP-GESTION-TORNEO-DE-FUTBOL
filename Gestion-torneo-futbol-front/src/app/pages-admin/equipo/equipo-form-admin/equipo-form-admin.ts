import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import Equipo from '../../../model/equipo';

@Component({
  selector: 'app-equipo-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './equipo-form-admin.html',
  styleUrl: './equipo-form-admin.css',
})
export class EquipoFormAdmin implements OnInit{

  equipoForm!: FormGroup;
  equipoID?: string;

  constructor(
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
      
      /*this.torneoForm = this.fb.group({
  
        
        titulo: ['', Validators.required],
        anio: ['', [Validators.required, Validators.min(1900)]]
      });*/
  
       this.equipoID = this.route.snapshot.params['id'];
       if (this.equipoID) {
         this.equipoService.getEquipoById(this.equipoID)
         .subscribe(movie => this.equipoForm.patchValue(movie));
       }
     }
  
     onSubmit(): void {
    
      if (this.equipoForm.invalid) return;
  
       if (this.equipoID) {
  
         const equipoData: Equipo = { id: this.equipoID, ...this.equipoForm.value }; 
  
         this.equipoService.updateEquipo(equipoData).subscribe({
           next: () => this.router.navigate(['/equipo-admin']),
           error: (e) => {console.log(e)} });
  
       } else {
  
         const torneoData = this.equipoForm.value; 
        
         this.equipoService.postEquipo(torneoData).subscribe({
           next: () => this.router.navigate(['/equipo-admin']),
           error: (e) => {console.log(e)} });
       }
    }
  }

