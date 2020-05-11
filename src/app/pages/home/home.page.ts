import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router:Router){}
  ngOnInit(){
    const token_key = localStorage.getItem('token');
    if(!token_key){
      this.router.navigate(['/']);
    }
  }
}
