import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { ActivatedRoute, Router } from '@angular/router';
import Torneo from '../../../model/torneo';

@Component({
  selector: 'app-torneo-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './torneo-form-admin.html',
  styleUrl: './torneo-form-admin.css',
})
export class TorneoFormAdmin implements OnInit{


  torneoForm!: FormGroup;
  torneoID?: string;

  constructor(
    private fb: FormBuilder,
    private torneoService: TorneoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    /*
    this.torneoForm = this.fb.group({

      /*
      titulo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900)]]
    });*/

    this.torneoID = this.route.snapshot.params['id'];
    if (this.torneoID) {
      this.torneoService.getTorneoById(this.torneoID)
        .subscribe(movie => this.torneoForm.patchValue(movie));
    }
  }

  onSubmit(): void {
  
    if (this.torneoForm.invalid) return;

    if (this.torneoID) {

      const torneoData: Torneo = { id: this.torneoID, ...this.torneoForm.value }; 

      this.torneoService.updateTorneo(torneoData).subscribe({
        next: () => this.router.navigate(['/torneos-admin']),
        error: (e) => {console.log(e)} });

    } else {

      const torneoData = this.torneoForm.value; 
      
      this.torneoService.postTorneo(torneoData).subscribe({
        next: () => this.router.navigate(['/movies']),
        error: (e) => {console.log(e)} });
    }
  }
}
