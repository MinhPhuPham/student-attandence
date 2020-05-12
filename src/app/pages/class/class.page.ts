import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

import {Classes} from '../../mocks_data/classes';
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {
  listClasses=[...Classes]
  classes=[];
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        let subject_id = parseInt(params.get('subject_id'))
        this.classes.length=0
         this.listClasses.filter(classes => {
           if(classes.subject_id === subject_id){
             this.classes.push(classes)
           } 
           return this.classes;
        })[0]
        
      })
      console.log(this.classes);

    }
}
