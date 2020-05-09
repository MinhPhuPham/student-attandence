import { Injectable } from '@angular/core';
import {Teacher} from '../interfaces/teacher'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  teachers_list:AngularFireList<Teacher>=null;
  teacher:AngularFireObject<any>;
  collectionName = 'student-attendance-d99c1';
  constructor(private db:AngularFireDatabase) {
    // this.getTeachersList();
    this.teachers_list = db.list('/teacher');
    // console.log(this.teachers_list);
    
   } 
   async getTeachersList(){
    await firebase.database().ref('teacher').on('value', (data)=>{
        let user=  data.val();
        console.log(user);
      })
  }

}
