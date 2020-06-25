import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
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
  subject_name;
  students_note = [];
  class_name;
  Note="";
  date = moment().format("DD/MM/YYYY");
  student_checked = {};
  class_id;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userservice: UserService,
    private callNumber: CallNumber,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private _CtrlNav: NavController) { }
  sliderConfig = {
    // slidesPerView: 1.6,
    initialSlide: 1,
    speed: 400,
    spaceBetween: 10,
    centeredSlides: true
  };
  ngOnInit() {
    this.userservice.loadingPresent("", false);
    
    this.subject_name = localStorage.getItem('name_subjects');
    this.class_name = localStorage.getItem('class_name')

    const id = this.route.snapshot.paramMap.get('class_id');
    this.userservice.getStudents(id).then(value => {
      this.listStudents = value.data.students;
      this.class_id = value.data.class_id;
      this.students = this.listStudents.reduce((obj, student) => {
        return { ...obj, [student._id]: false }
      }, {})
      this.students_note = this.listStudents.reduce((obj, student) => {
        return { ...obj, [student._id]: "" }
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

  async NoteStudent(id){
    const alert = await this.alertCtrl.create({
      header: 'Want to note this student',
      message: 'Enter you note to send a message for student.',
      inputs: [
        {
          name: 'note',
          type: 'text',
          placeholder: 'Note'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: async (data) => {
            this.students_note[id] = data.note;
              const toast = await this.toastCtrl.create({
                message: 'Note was saved successfully.',
                duration: 3000,
                position: 'bottom',
                color: "success"
              });
              toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  Submit() {
    this.userservice.loadingPresent('Success to checked', true);
    localStorage.setItem('class_id_checked', this.class_id);
    let data = {
      class_id: this.class_id,
      date: moment().format("DD/MM/YYYY"),
      students: {
        ...this.students
      },
      notes:{
        ...this.students_note
      }
    }
    console.log(data);
    this.userservice.SubmitCheckStudents(data).then(value => {
      if (value.status == "OK") {
        console.log("success");
        this.userservice.loadingDismiss();
        this._CtrlNav.navigateRoot('/dashbroad')
      }
    })
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  Back() {
    this.location.back();
  }
}
