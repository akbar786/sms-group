import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../models/city.interface';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

  cityId: number;

  myForm: FormGroup;
  statusList = [
    'Seldom' , 'Monthly' , 'Yearly' , 'Often' , 'Never' , 'Once' , 'Weekly'
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      id: new FormControl(''),
      city: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl(''),
      color: new FormControl('')
    });

    if (this.route.snapshot.params.id) {
      this.cityId = +this.route.snapshot.params.id;
      this.http.get('http://localhost:3000/city/'+this.cityId).subscribe((result: {
        status: boolean,
        data: City
      }) => {
        console.log('city: ', result.data);
        this.myForm.setValue(result.data);
      });
    }

  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value);
  }

}
