import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img 
      class="listing-photo"
      [src]="housingLocation?.photo"
      alt="Exterior photo of {{ housingLocation?.name }}"
      crossorigin 
      />
    <section class = "listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
      <li>Units available: {{ housingLocation?.availableUnits }}</li>
      <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
      <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
      </ul>
    </section>
    <section class = "listings-apply">
      <h2 class = "section-heading">Apply to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()"> 
        <label for="first-Name">First Name</label>
        <input id="first-Name" type = "text" formControlName = "firstName">

        <label for="last-Name">Last Name</label>
        <input id="last-Name" type = "text" formControlName = "lastName">
        
        <label for="email">Email</label>
        <input id="email" type = "email" formControlName = "email">

        <button type= "submit" class="primary"> Apply Now </button>
      </form>
    </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  housingLocation: HousingLocation | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);  
  applyForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication()
  {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
