import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { SessionStorageService } from 'angular-web-storage';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private _serv:FirebaseServiceService,private sto:SessionStorageService) { }

  history=[];
  itemList=[];

  currentUser;
  ngOnInit() {
    this._serv.getHistory().subscribe(
      list => {
        this.history = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      this._serv.getItemsList().subscribe(
        list => {
          this.itemList = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
  

      var temp=this.sto.get('user');
      this.currentUser=temp.username;
      

  }

}
