import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../models/city.interface';
import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { environment} from '../../environments/environment';

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
    private http: HttpClient,
    public dialog: MatDialog
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
      this.http.get(`${environment.api}/city/${this.cityId}`).subscribe((result: {
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

    if (form.valid) {
      let url = `${environment.api}/city`;
      if (this.cityId) {
        url += `/${this.cityId}`;
        this.http.put(url, form.value).subscribe((result: {
          status: boolean,
          message: string
        }) => {
          console.log('result', result);
          if (result.status) {
            const dialogRef = this.dialog.open(AlertComponent, {
              data: {
                title: 'Success',
                message: result.message
              }
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(['']);
            });
          } else {
            this.dialog.open(AlertComponent, {
              data: {
                title: 'Error',
                message: result.message
              }
            });
          }
        });
      } else {
        this.http.post(url, form.value).subscribe((result: {
          status: boolean,
          message: string
        }) => {
          console.log('result', result);
          if (result.status) {
            const dialogRef = this.dialog.open(AlertComponent, {
              data: {
                title: 'Success',
                message: result.message
              }
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(['']);
            });
          } else {
            this.dialog.open(AlertComponent, {
              data: {
                title: 'Error',
                message: result.message
              }
            });
          }
        });
      }

    }

  }

}
