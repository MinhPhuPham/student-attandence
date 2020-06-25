import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NavController} from '@ionic/angular';
import { Location } from "@angular/common";

import { Classes } from '../../mocks_data/classes';
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {
  listClasses = [...Classes]
  classes = [];
  isCheck: boolean;
  constructor(private route: ActivatedRoute, private location: Location,private userservice: UserService, private navCtrl:NavController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('subject_id');
    const checktype = this.route.snapshot.paramMap.get('istype');
    this.checkType(checktype);
    this.userservice.loadingPresent("", false);
    this.userservice.getClasses(id).then(value => {
      this.classes = value.data;
      this.userservice.loadingDismiss();
      return this.classes;
    })
  }
  SaveClassName(name) {
    localStorage.setItem('class_name', name);
  }
  RedictStory(id, name){
    localStorage.setItem('class_name', name);
    this.navCtrl.navigateRoot([`dashbroad/home/students/${id}/histories`]);
  }
  checkType(type) {
    if (type == "check") {
      return this.isCheck = true;
    }
    return this.isCheck = false
  }
  Back() {
    this.location.back();
  }
}
