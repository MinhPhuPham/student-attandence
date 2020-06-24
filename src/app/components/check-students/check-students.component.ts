import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';
import * as moment from 'moment';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-check-students',
  templateUrl: './check-students.component.html',
  styleUrls: ['./check-students.component.scss'],
})
export class CheckStudentsComponent implements OnInit {
  listStudents = [];
  students = [];
  checked = [];
  student_checked = {};
  class_id;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userservice: UserService,
    private _CtrlNav: NavController) { }
  sliderConfig = {
    // slidesPerView: 1.6,
    initialSlide: 1,
    speed: 400,
    spaceBetween: 10,
    centeredSlides: true
  };
  ngOnInit() {
    this.userservice.loadingPresent("", false)
    const id = this.route.snapshot.paramMap.get('class_id');
    this.userservice.getStudents(id).then(value => {
      console.log(value);
      this.listStudents = value.data.students;
      this.class_id = value.data.class_id;
      this.students = this.listStudents.reduce((obj, student) => {
        return { ...obj, [student._id]: false }
      }, {})
      this.userservice.loadingDismiss();
      return this.students;
    })

  }
  selectedAll: boolean;
  selectall() {
    this.selectedAll = true;
    this.listStudents.forEach(obj => {
      obj.status = this.selectedAll;
    })
  }
  unselectAll() {
    this.selectedAll = false;
    this.listStudents.forEach(obj => {
      obj.status = this.selectedAll
    })
  }
  checkedbox(id): boolean {
    if (this.students[id]) {
      return false
    }
    return true
  }

  arrayRemove(arr, value) {
    return arr.filter(item => item !== value)
  }

  onChange(id) {
    this.students[id] = this.checkedbox(id);
  }
  Submit() {
    this.userservice.loadingPresent('Success to checked', true);
    let data = {
      class_id: this.class_id,
      date: moment().format("DD/MM/YYYY"),
      students: {
        ...this.students
      }
    }
    this.userservice.SubmitCheckStudents(data).then(value => {
      if (value.status == "OK") {
        console.log("success");
        this.userservice.loadingDismiss();
        this._CtrlNav.navigateRoot('/home')
      }
    })
    console.log(data);
  }


  Back() {
    this.location.back();
  }
}
