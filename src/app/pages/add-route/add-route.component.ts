import { Component } from '@angular/core';
import { faMapMarkerAlt, faCalendarAlt, faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field } from 'src/app/models/field';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiService } from 'src/app/services/api.service';

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

  addStep: Field = {
    value: 'Ajouter une étape',
    type: 'button',
    icon: faPlus,
    action: this.addNewStep
  }

  steps = [];

  form1: Field[] = [this.startingPoint, this.arrivalPoint, this.date, this.numberOfPassengers];
  form2: Field[] = [this.startingPoint, this.addStep, this.arrivalPoint];

  forms = [this.form1, this.form2];

  step: number = 0;

  constructor(private apiService: ApiService) {}

  next() {
    this.step++;
  }

  create() {
    let steps = [
      {
        departTime: this.date.value,
        positionDepart: {
          city: this.startingPoint.adresse?.city,
          address: this.startingPoint.adresse?.address,
          pc: 0
        },
        positionArrival: {
          city: this.arrivalPoint.adresse?.city,
          address: this.arrivalPoint.adresse?.address,
          pc: 0
        },
        duration: 60,
        seats: this.numberOfPassengers.value
      }
    ]
    this.apiService.createRoute(steps).subscribe(result => console.log(result));
  }

  addNewStep(form: Field[]) {
    const stepField: Field = {
      label: 'Étape',
      value: '',
      type: this.typePoint,
      icon: faMapMarkerAlt
    };
    form.splice(form.length-2, 0, stepField);
  }

  handleAddressChange(address: Address, field: Field) {
    field.value = address.formatted_address;
    let city = address.address_components.find(adr => adr.types.includes('locality'))?.long_name ?? undefined;
    field.adresse = {city, address: address.formatted_address};
    console.log(address);
    console.log(this.form1);
    console.log(this.form2);
  }

}
