import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { GetOnewayTrip } from '../../modules/get-oneway-trip';
import { OnewayTrip } from '../../modules/oneway-trip';

@Component({
  selector: 'app-editbooking',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css'
})
export class EditbookingComponent {
  error: string = '';
  isRecurring: boolean = false;
  every: string = '';

  currentTrip: GetOnewayTrip = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    tripType: '',
    from: '',
    to: '',
    date: '',
    time: '',
    extra_services: '',
    recurring: ''
  };
  constructor(private tripServices: TripsService, private router: Router, private route: ActivatedRoute) {}

  // Metoder
  ngOnInit() {
    this.currentTrip.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.tripServices.getChosenOnewayTrip(this.currentTrip.id).subscribe(currentTrip => {
      this.currentTrip = currentTrip;
      currentTrip.date = this.currentTrip.date.split('T')[0];
      
      if(currentTrip.recurring === 'Nej'){
        this.isRecurring = false;
      } else {
        this.isRecurring = true;
        this.every = currentTrip.recurring.slice(10, 15);
      }
    });
  }

  updateTrip() {

    let newOnewayTrip: OnewayTrip = {
      firstname: this.currentTrip.firstname,
      lastname: this.currentTrip.lastname,
      email: this.currentTrip.email,
      tripType: 'Enkel resa',
      from: this.currentTrip.from,
      to: this.currentTrip.to,
      date: this.currentTrip.date.split('T')[0],
      time: this.currentTrip.time.slice(0, 5),
      extraServices: this.currentTrip.extra_services,
      recurring: this.isRecurring ? `Ja, varie ${this.every}`: 'Nej'
    }
    
    this.tripServices.updateOnewayTrip(this.currentTrip.id, newOnewayTrip).subscribe({
      next: response => {
        this.error = '';
        console.log(response);
        alert(`Din resa med bokningsnummer: ${this.currentTrip.id} har updaterats`);
        this.router.navigate(['/useraccount']);
      },
      error: err => {
        this.error = err.error.message;
        console.error(err);
      }
    });
  }
}
