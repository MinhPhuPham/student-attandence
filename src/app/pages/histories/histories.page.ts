import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {UserService} from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {
ListDate=[];
term= '';
subject_name = '';
class_name ='';
  constructor(
    private location: Location,
    private userservice: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('class_id');
    this.subject_name = localStorage.getItem('subjects_story');
    this.class_name = localStorage.getItem('class_name');
    this.userservice.loadingPresent("", false);
    this.userservice.getStoriesDay(id).then(value => {
      this.ListDate = value.data;
      this.userservice.loadingDismiss();
      return this.ListDate;
    })
  }
  Back() {
    this.location.back();
  }
}
