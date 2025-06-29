import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetRoundTrip } from '../../modules/get-round-trip';
import { TripsService } from '../../services/trips.service';
import { RoundTrip } from '../../modules/round-trip';

@Component({
  selector: 'app-editroundtrip',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './editroundtrip.component.html',
  styleUrl: './editroundtrip.component.css'
})
export class EditroundtripComponent {
  error: string = '';
  isRecurring: boolean = false;
  every: string = '';

  currentTrip: GetRoundTrip = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    tripType: 'Tur och retur',
    from: '',
    to: '',
    date: '',
    time: '',
    return_date: '',
    return_time: '',
    extra_services: '',
    recurring: ''
  };
  constructor(private tripServices: TripsService, private router: Router, private route: ActivatedRoute) {}

  // Metoder
  ngOnInit() {
    
    this.currentTrip.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.tripServices.getChosenRoundTrip(this.currentTrip.id).subscribe(currentTrip => {

      this.currentTrip = currentTrip;
      currentTrip.date = this.currentTrip.date.split('T')[0];
      currentTrip.return_date = this.currentTrip.return_date.split('T')[0];

      if(currentTrip.recurring === 'Nej'){
        this.isRecurring = false;
      } else {
        this.isRecurring = true;
        this.every = currentTrip.recurring.slice(10, 15);
      }
    });
  }

  updateTrip() {

    let newRoundTrip: RoundTrip = {
      firstname: this.currentTrip.firstname,
      lastname: this.currentTrip.lastname,
      email: this.currentTrip.email,
      tripType: 'Tur och retur',
      from: this.currentTrip.from,
      to: this.currentTrip.to,
      date: this.currentTrip.date.split('T')[0],
      time: this.currentTrip.time.slice(0, 5),
      returnDate: this.currentTrip.return_date.split('T')[0],
      returnTime: this.currentTrip.return_time.slice(0, 5),
      extraServices: this.currentTrip.extra_services,
      recurring: this.isRecurring ? `Ja, varie ${this.every}`: 'Nej'
    };
    
    
    this.tripServices.updateRoundTrip(this.currentTrip.id, newRoundTrip).subscribe({
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
