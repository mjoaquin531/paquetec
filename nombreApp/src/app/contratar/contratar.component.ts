import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {Map, tileLayer} from 'leaflet';
import { max } from 'rxjs';
@Component({
  selector: 'app-contratar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contratar.component.html',
  styleUrl: './contratar.component.css'
})
export class ContratarComponent {

  ngAfterViewInit() {
    const map = new Map("map").setView([51.505, -0.09], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'}
    ).addTo(map);
  }
}
