import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address as GgAdrress } from 'ngx-google-places-autocomplete/objects/address';
import { Address } from 'src/app/models/address';
import { ApiService } from 'src/app/services/api.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  depart: string = '';
  arrive: string = '';

  objDepart: Address | null = null;
  objArrive: Address | null = null;
  date: string | null = null;

  fields = ['address_components', 'formatted_address'];

  constructor(private apiService: ApiService, private jwtTokenService: JwtTokenService, private router: Router) { }
  
  handleAddressChange(event: GgAdrress, adr: Address | null): Address {
    let city = event.address_components.find(adr => adr.types.includes('locality'))?.long_name ?? undefined;
    let pc = event.address_components.find(adr => adr.types.includes('postal_code'))?.long_name ?? undefined;
    adr = {city, address: event.formatted_address, pc};
    return adr;
  }

  search() {
    console.log(this.objArrive);
    console.log(this.objArrive);
    console.log(this.date);
    this.apiService.search(this.objDepart, this.objArrive, this.date).subscribe(res => {
      console.log(res);
    })
  }

  logout() {
    this.jwtTokenService.removeToken();
    this.router.navigate(['login'])
  }
}
