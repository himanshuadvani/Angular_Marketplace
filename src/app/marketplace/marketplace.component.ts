import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  constructor(private _serv:FirebaseServiceService,private sto:SessionStorageService,private _router:Router) {
   }

  
   itemsArray=[];
   history=[];
   usersArray=[]
   currentUser;
   balance;
   key;

   editFlag:boolean=false;
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
 

       this._serv.getHistory().subscribe(
        list => {
          this.history = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
  
        this._serv.getUsersList().subscribe(
          list => {
            this.usersArray = list.map(item => {
              return {
                $key: item.key,
                ...item.payload.val()
              };
            });
          });

 
      var temp=this.sto.get('user');
      this.currentUser=temp.username;
      this.balance=parseInt(temp.balance);
   }

   onBuyItem(value)
   {
    if (confirm('Do you want to buy this product: '+value.itemname)) 
    {
      var key='';
      var sellerBalance;
     console.log(value);
     var user=this.sto.get('user');
     console.log(user.username);
 
     for(var i=0;i<this.usersArray.length;i++)
     {
       if(this.usersArray[i].username==value.itemowner)
       {
         key=this.usersArray[i].$key;
         sellerBalance=this.usersArray[i].balance;
         console.log("Key:"+key);
         break;
       }
     }
     
     sellerBalance=parseInt(sellerBalance)+parseInt(value.itemprice);
     console.log("Seller balance: "+sellerBalance);
     var balance=parseInt(user.balance)-parseInt(value.itemprice);
     console.log("Buyer balance: "+balance);
     this._serv.buyItem(value,user,balance,key,sellerBalance);
     this._router.navigate(["/home/marketplace"]);
 
    }
     
    

  }

  onEditItem(key)
  {
    this.key=key;
    
    console.log(key);
    if(this.editFlag==false)
    {
    this.editFlag=true;
    }
    else{
      this.editFlag=false;
      }
  }


  EditItem(_value,_newName,_newPrice,_newURL)
  {
    console.log(_value.$key+" "+_newName+" "+_newPrice);
    this._serv.editItem(_value,_newName,_newPrice,_newURL);
    this._router.navigate(["/home/marketplace"]);
    this.editFlag=false;


  }

  onDeleteItem(_value)
  {

    if (confirm('Do you want to delete this product: '+_value.itemname)) 
    {
      this._serv.deleteItem(_value);
      this._router.navigate(["/home/marketplace"]);
    }
  }
   
}
