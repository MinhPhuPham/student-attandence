import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-profile-students',
  templateUrl: './profile-students.page.html',
  styleUrls: ['./profile-students.page.scss'],
})
export class ProfileStudentsPage implements OnInit {
  Profile;
  Stories;
  Summary;
  progressvalue: Number;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userservice: UserService,
    private callNumber: CallNumber
    ) { }

  ngOnInit() {
    const class_id = this.route.snapshot.paramMap.get('class_id');
    const student_id = this.route.snapshot.paramMap.get('student_id');
    this.userservice.loadingPresent("", false);
    this.userservice.getProfileStudent(class_id,student_id).then(value =>{
      this.Profile = value.data.profile;
      this.Stories = value.data.stories;
      this.Summary = value.data.summary;
      this.progressvalue = (this.Summary.attend/(this.Summary.attend + this.Summary.absent))*100
      this.userservice.loadingDismiss();
    })
  }
  Back() {
    this.location.back();
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
