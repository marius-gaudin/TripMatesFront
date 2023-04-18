import { Component } from '@angular/core';
import { faMapMarkerAlt, faCalendarAlt, faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field } from 'src/app/models/field';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiService } from 'src/app/services/api.service';
import { Step } from 'src/app/models/step';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {

  options = {
    componentRestrictions: {
      country: 'FR'
    }
  }
  typePoint: string = 'point';
  typeBouton: string = 'button';

  startingPoint: Field = {
    label: 'Départ',
    value: '',
    type: this.typePoint,
    icon: faMapMarkerAlt
  };

  arrivalPoint: Field = {
    label: 'Arrivé',
    value: '',
    type: this.typePoint,
    icon: faMapMarkerAlt
  };

  date: Field = {
    label: 'Date/Heure de Départ',
    value: null,
    type: 'datetime-local',
    icon: faCalendarAlt
  };

  numberOfPassengers: Field = {
    label: 'Nombre de passagers',
    value: 2,
    type: 'number',
    icon: faCar
  }

  addNewStep = () => {
    console.log(this.typePoint);
    const stepField: Field = {
      label: 'Étape',
      value: '',
      type: this.typePoint,
      icon: faMapMarkerAlt
    };
    this.form2.splice(this.form2.length-2, 0, stepField);
  }

  addStep: Field = {
    value: 'Ajouter une étape',
    type: 'button',
    icon: faPlus,
    action: this.addNewStep
  }

  form1: Field[] = [this.startingPoint, this.arrivalPoint, this.date, this.numberOfPassengers];
  form2: Field[] = [this.startingPoint, this.addStep, this.arrivalPoint];

  forms = [this.form1, this.form2];

  step: number = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  next() {
    this.step++;
  }

  create() {
    let steps: Step[] = [];
    if(!this.startingPoint.adresse || !this.arrivalPoint.adresse) return;
    let allSteps = this.form2.filter(field => field !== this.addStep);
    allSteps.forEach((field, index) => {
      let arrival = allSteps[index+1]?.adresse
      if(index < allSteps.length && field.adresse && arrival) {
        let step: Step = {
          id: undefined,
          departTime: this.date.value,
          positionDepart: field.adresse,
          positionArrival: arrival,
          duration: 60,
          seats: this.numberOfPassengers.value
        }
        steps.push(step);
      }
    });
    this.apiService.createRoute(steps).subscribe(result => {
      this.router.navigate(['my-route']);
    });
  }

  handleAddressChange(address: Address, field: Field) {
    field.value = address.formatted_address;
    let city = address.address_components.find(adr => adr.types.includes('locality'))?.long_name ?? undefined;
    let pc = address.address_components.find(adr => adr.types.includes('postal_code'))?.long_name ?? undefined;
    let latitude = address.geometry.location.lat();
    let longitude = address.geometry.location.lng();

    let adr = address.address_components.find(adr => adr.types.includes('street_number'))?.long_name ?? '';
    if(adr.length > 0) {
      adr+=' ';
    }
    adr += address.address_components.find(adr => adr.types.includes('route'))?.long_name ?? '';

    if(adr === '') {
      adr = address.formatted_address;
    }

    field.adresse = {
      city, 
      address: adr, 
      pc, 
      longitude, 
      latitude
    };
  }

}
