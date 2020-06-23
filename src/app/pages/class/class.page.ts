import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import {UserService} from '../../services/user.service';

import {Classes} from '../../mocks_data/classes';
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {
  listClasses=[...Classes]
  classes=[];
    constructor(private route: ActivatedRoute, private userservice: UserService) { }
  
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('subject_id');
      this.userservice.getClasses(id).then(value => {
        this.classes = value.data
        console.log(this.classes);
        
        return this.classes;
      })
      
      

    }
}
