import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { Router } from '@angular/router';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import {City} from '../models/city.interface';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.scss']
})
export class ListCityComponent implements OnInit, AfterViewInit {

  limitOptions = [10, 20, 30]

  sortBy = 'id';
  sortOrder = 'ASC';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  minDate: Date;
  maxDate: Date;

  displayedColumns: string[] = ['id', 'city', 'start_date', 'end_date', 'price', 'status', 'color', 'star'];
  dataSource = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private router: Router) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getData(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: {
            stauts: boolean,
            data: {
              page: number,
              count: number,
              total_pages: number,
              data: City[]
            }
        }) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.data.count;

          return data.data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data: City[]) => this.dataSource = data);
  }

  getData(sortBy: string = 'id', sortOrder: SortDirection = 'desc', pageIndex: number = 1, pageSize: number = 20) {
    return this.http.get(`http://localhost:3000/city?sortBy=${sortBy}&sortOrder=${sortOrder.toUpperCase()}&limit=${pageSize}&page=${pageIndex}`);
  }

  addCity() {
    this.router.navigate(['city', 'add']);
  }

  editCity(data: City) {
    console.log('data : ', data);
    this.router.navigate(['city', 'update', data.id]);
  }

  deleteCity(data: City) {
    console.log('data : ', data);
  }

}
