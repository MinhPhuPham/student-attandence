import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subjects} from '../../../assets/mocks_data/subjects'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listSubjects=[];
  constructor(private router:Router){}
  ngOnInit(){
    this.listSubjects= JSON.parse(localStorage.getItem('subjects'));

    const token_key = localStorage.getItem('token');
    if(!token_key){
      this.router.navigate(['/']);
    }
  }
}
