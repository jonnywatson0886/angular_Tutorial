import { Component } from '@angular/core';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
   <section>
    <form>
      <input type="text" placeholder="Filter by City">
      <button class ="Primary" type="button">Search</button>
    </form>
   </section>
   <section class="results">
    <app-housing-location></app-housing-location> 
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
    readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

    housingLocation: HousingLocation =
    { 
      id: 9999,
      name: 'Test Home',
      city: 'Tesst City',
      state: 'ST',
      photo: '${this.baseUrl}/example-house.jpg',
      availableUnits: 99,
      wifi: true,
      laundry: false
    };
}
