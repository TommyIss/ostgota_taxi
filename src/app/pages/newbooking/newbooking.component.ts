import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { OnewayTrip } from '../../modules/oneway-trip';
import { RoundTrip } from '../../modules/round-trip';

@Component({
  selector: 'app-newbooking',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './newbooking.component.html',
  styleUrl: './newbooking.component.css'
})
export class NewbookingComponent {
  // Properties
  selectedTripType: 'oneway' | 'round' | null = null;
  
  showOnewayForm: string = 'none';
  showRoundForm: string = 'none';
  
  // Enkelresa uppgifter
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tripType: string = 'Enkel resa';
  from: string = '';
  to: string = '';
  date: string = '';
  time: string = '';
  extraServices: string = '';
  isRecurring: boolean = false;
  recurring: string = '';
  every: string = '';

  // Tur och retur uppgifter
  firstnameRound: string = '';
  lastnameRound: string = '';
  emailRound: string = '';
  tripTypeRound: string = 'Tur och retur';
  fromRound: string = '';
  toRound: string = '';
  dateDepart: string = '';
  timeDepart: string = '';
  dateReturn: string = '';
  timeReturn: string = '';
  extraServicesRound: string = '';
  isRecurringRound: boolean = false;
  recurringRound: string = '';
  everyRound: string = '';

  error: string = '';

  constructor(private tripServices: TripsService, private router: Router) {}

  selectTrip(type: 'oneway' | 'round') {
    this.selectedTripType = type;

    if(this.selectedTripType === 'oneway') {
      this.showOnewayForm = 'block'
    } else {
      this.showOnewayForm = 'none'
    }

    if(this.selectedTripType === 'round') {
      this.showRoundForm = 'block'
    } else {
      this.showRoundForm = 'none'
    }
  }
  
  bookOnewayTrip() {
    let newOnewayTrip: OnewayTrip = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      tripType: this.tripType,
      from: this.from,
      to: this.to,
      date: this.date,
      time: this.time,
      extraServices: this.extraServices,
      recurring: this.isRecurring ? `Ja, varie ${this.every}`: 'Nej'
    }

    
    this.tripServices.postOnewaytrip(newOnewayTrip).subscribe({
      next: response => {
        this.error = '';
        console.log(response);
        alert('Resan är bokad, du komemr att få ett bekräftelse mejl inom kort!');
        this.router.navigate(['/useraccount']);
      },
      error: err => {
        this.error = err.error.message;
        console.error(err);
      }
    });
  }

  bookRoundTrip() {
    let newRoundTrip: RoundTrip = {
      firstname: this.firstnameRound,
      lastname: this.lastnameRound,
      email: this.emailRound,
      tripType: this.tripTypeRound,
      from: this.fromRound,
      to: this.toRound,
      date: this.dateDepart,
      time: this.timeDepart,
      returnDate: this.dateReturn,
      returnTime: this.timeReturn,
      extraServices: this.extraServicesRound,
      recurring: this.isRecurringRound ? `Ja, varie ${this.everyRound}`: 'Nej'
    }

    this.tripServices.postRoundtrip(newRoundTrip).subscribe({
      next: response => {
        this.error = '';
        console.log(response);
        alert('Resan är bokad, du komemr att få ett bekräftelse mejl inom kort!');
        this.router.navigate(['/useraccount']);
        
      },
      error: err => {
        this.error = err.error.message;
        console.error(this.error);
      }
    });
  }

}
