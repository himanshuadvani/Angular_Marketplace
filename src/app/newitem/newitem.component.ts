import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.css']
})
export class NewitemComponent implements OnInit {

  constructor(private _serv:FirebaseServiceService,private _form:FormBuilder,private sto:SessionStorageService,private _router:Router) { }

  itemsArray=[];
  ngOnInit() {
   this._serv.getItemsList().subscribe(
      list => {
        this.itemsArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });


  }

  newitemForm=this._form.group(
    {
      itemName:[,[Validators.required]],
      itemPrice:[,[Validators.required]],
      imageURL:[,[]]
    }
  )

  addNewItem()
  {
    console.log(this.itemsArray);
    console.log(this.newitemForm.value);
    var owner=this.sto.get('user');
    console.log("User: "+owner.username);
   this._serv.insertItem(this.newitemForm.value,owner.username);
   this._router.navigate(["/home/marketplace"]);


  }
}
