import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports : [RouterOutlet,CommonModule]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
