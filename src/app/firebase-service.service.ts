import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(public firebase:AngularFireDatabase) {

   }

  userList:AngularFireList<any>;
  itemList:AngularFireList<any>;
  history:AngularFireList<any>;

  getUsersList()
  {
    this.userList = this.firebase.list('Data/Users');
    return this.userList.snapshotChanges();
  }

  getItemsList()
  {
    this.itemList=this.firebase.list('Data/Items');
    return this.itemList.snapshotChanges();
  }

  getHistory()
  {
    this.history=this.firebase.list('Data/History');
    return this.history.snapshotChanges();
  }

  insertUser(temp)
  {
    this.userList.push(
      {
        username:temp.uname,
        fullname:temp.fname,
        password:temp.pword,
        balance:100000
      }
    )
  }


  insertItem(item,owner)
  {
    this.itemList.push(
      {
        itemname:item.itemName,
        itemprice:item.itemPrice,
        itemowner:owner,
        transacted:false,
        image:item.imageURL
      }
    )
  }

  buyItem(_item,_user,_buyerBalance,_key,_sellerBalance)
  {
    
    this.history.push(
      {
        itemname:_item.itemname,
        itemprice:_item.itemprice,
        bought_from:_item.itemowner,
        sold_to:_user.username
      }
    )
    this.itemList.update(_item.$key,
      {
        itemowner:_user.username,
        transacted:true
      });

      this.userList.update(_user.$key,
        {
          balance:_buyerBalance
        });

        this.userList.update(_key,
          {
            balance:_sellerBalance
          })

        

  }

  editItem(_value,_newname,_newPrice,_newURL)
  {
    this.itemList.update(_value.$key,
      {
        itemname:_newname,
        itemprice:_newPrice,
        image:_newURL
      })
  }

  deleteItem(_value)
  {
    this.itemList.remove(_value.$key);
  }

}
