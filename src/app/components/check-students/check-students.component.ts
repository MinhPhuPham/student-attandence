import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Location } from "@angular/common";
import {Students} from '../../mocks_data/students';
@Component({
  selector: 'app-check-students',
  templateUrl: './check-students.component.html',
  styleUrls: ['./check-students.component.scss'],
})
export class CheckStudentsComponent implements OnInit {
  listStudents=[...Students];
  students=[];
  constructor(private route: ActivatedRoute, private location:Location) { }
  sliderConfig = {
    // slidesPerView: 1.6,
    initialSlide: 1,
    speed: 400,
    spaceBetween: 10,
    centeredSlides: true
  };
  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      let classes_id = parseInt(params.get('class_id'))
      this.students.length=0
       this.listStudents.filter(students => {
         if(students.classes_id === classes_id){
           this.students.push(students)
         } 
         return this.students;
      })[0]
      
    })
    
  }

  Back(){
    this.location.back();
  }
}
