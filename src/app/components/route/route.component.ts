import { Component, Input, ViewChild } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {

  @ViewChild('map') map: google.maps.Map | undefined
  
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
	draggable: false
  };

  ynovMarker: google.maps.LatLngLiteral = {
    lat: 47.205627989471786, 
    lng: -1.539325073169787
  }

  angersMarker: google.maps.LatLngLiteral = {
    lat: 47.464668983538836,
    lng: -0.5562027040525435
  }

  ds: google.maps.DirectionsService = new google.maps.DirectionsService();
  dr: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer({
    map: null,
    suppressMarkers: true
  });

  constructor() {}

  ngAfterViewInit() {
    this.fitBounds();
    this.setRoutePolyline();
  }

  fitBounds() {    
    console.log('ici')
    if(this.map) {  
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(this.ynovMarker);
      bounds.extend(this.angersMarker);
      this.map.fitBounds(bounds);
    }
  }

  setRoutePolyline() {
    const request = {
      origin: this.ynovMarker,
      destination: this.angersMarker,
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.ds.route(request, (response, status) => {
      if(this.map && status == google.maps.DirectionsStatus.OK){
        this.dr.setMap(this.map.data.getMap());
        this.dr.setDirections(response);
      }
    })
  }

}
