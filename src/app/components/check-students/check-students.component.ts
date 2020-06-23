import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Location } from "@angular/common";
import {Students} from '../../mocks_data/students';

import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-check-students',
  templateUrl: './check-students.component.html',
  styleUrls: ['./check-students.component.scss'],
})
export class CheckStudentsComponent implements OnInit {
  listStudents=[...Students];
  students=[];
  checked = [];
  constructor(private route: ActivatedRoute, private location:Location, private userservice: UserService) { }
  sliderConfig = {
    // slidesPerView: 1.6,
    initialSlide: 1,
    speed: 400,
    spaceBetween: 10,
    centeredSlides: true
  };
  ngOnInit() {
    
    // this.route.paramMap.subscribe(params => {
    //   let classes_id = parseInt(params.get('class_id'))
    //   this.students.length=0
    //    this.listStudents.filter(students => {
    //      if(students.classes_id === classes_id){
    //        this.students.push(students)
    //      } 
    //      return this.students;
    //   })[0]
      
    // })
    const id = this.route.snapshot.paramMap.get('class_id');
    this.userservice.getStudents(id).then(value => {
      this.students = value.data;
      console.log(this.students);
      return this.students;
    })
    
  }
  selectedAll:boolean;
  selectall(){
    this.selectedAll = true;
    this.students.forEach(obj => {
      obj.status = this.selectedAll;
    })
  }
  unselectAll(){
    this.selectedAll= false;
    this.students.forEach(obj => {
      obj.status = this.selectedAll
    })
  }
  checkedbox(id):boolean{

    if(this.checked.indexOf(id) > -1){
      return false;
    } 
      return true;
  }

  arrayRemove(arr, value) {
    return arr.filter(item => item !== value)
  }

  onChange(id){
    if(this.checkedbox(id) == true){
      this.checked.push(id)
      console.log(this.checked);
      return this.checked;
  }else(this.checkedbox(id) == false)
    {
      this.checked =  this.arrayRemove(this.checked, id);
      console.log(this.checked);
      return this.checked;
    }
  }

  onSubmit(){
    
  }


  Back(){
    this.location.back();
  }
}
