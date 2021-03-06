import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-list-students-his',
  templateUrl: './list-students-his.page.html',
  styleUrls: ['./list-students-his.page.scss'],
})
export class ListStudentsHisPage implements OnInit {
  listStudents;
  term;
  day;
  subject_name;
  class_name='';
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userservice: UserService
    ) { }

  ngOnInit() {
    const day = this.route.snapshot.paramMap.get('day');
    this.day = day;
    this.subject_name = localStorage.getItem('subjects_story');
    this.class_name = localStorage.getItem('class_name');
    const subject_id = this.route.snapshot.paramMap.get('class_id');
    this.userservice.loadingPresent("", false);
    this.userservice.getHistoriesListStudent(subject_id,decodeURIComponent(day)).then(value =>{
      this.listStudents= value.data;
      this.userservice.loadingDismiss();
    })
    
  }
  Back() {
    this.location.back();
  }
}
