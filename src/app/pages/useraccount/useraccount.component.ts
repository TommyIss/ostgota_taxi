import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { CommonModule } from '@angular/common';
import { GetRoundTrip } from '../../modules/get-round-trip';
import { GetOnewayTrip } from '../../modules/get-oneway-trip';

@Component({
  selector: 'app-useraccount',
  imports: [RouterLink, CommonModule],
  templateUrl: './useraccount.component.html',
  styleUrl: './useraccount.component.css'
})
export class UseraccountComponent {
  onewayTrips: GetOnewayTrip[] = [];
  roundTrips: GetRoundTrip[] = [];

  constructor(private tripsService: TripsService, private router: Router) {}

  ngOnInit() {
    this.tripsService.getOnewayTrips().subscribe((onewayTrips) => {
      this.onewayTrips = onewayTrips;
      onewayTrips.sort((a, b) => 
        (a.id > b.id) ? 1: -1
      );
    });
    
    this.tripsService.getRoundTrips().subscribe((roundTrips) => {
      this.roundTrips = roundTrips;
      roundTrips.sort((a, b) => 
        (a.id > b.id) ? 1: -1
      );
    });
  }

  // Metoder för enkel resor
  updateOnewayTrip(id: number) {
    this.router.navigate([`editbooking/${id}`]);
  }

  deleteOnewayTrip(id: number) {
    this.tripsService.deleteOnewayTrip(id).subscribe({
      next: () => {
        console.log(`Resan med bokningsnummer: ${id} har raderats`);
        alert('Din booking har raderats!');
        window.location.reload();
      },
      error: err => console.error('Fel vid anslutning: ', err)
    });
  }

  // Metoder för tur och retur
  updateRoundTrip(id: number) {
    this.router.navigate([`editroundtrip/${id}`]);
  }

  deleteRoundTrip(id: number) {
    this.tripsService.deleteRoundTrip(id).subscribe({
      next: () => {
        console.log(`Resan med bokningsnummer: ${id} har raderats`);
        alert('Din booking har raderats!');
        window.location.reload();
      },
      error: err => console.error('Fel vid anslutning: ', err)
    });
  }
}
