import { Component} from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
 

  usersArray=[];
  userId;
  userName;
  balance;
  user;
  m:boolean=true;
  n:boolean=false;
  h:boolean=false;


  constructor(private _serv:FirebaseServiceService,private route:ActivatedRoute,private router:Router,private sto:SessionStorageService) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log("Id: "+id);
      this.userId=id;
      
    });

    this.user=this.sto.get('user');
    this.userName=this.user.fullname;
    this.balance=this.user.balance;
  }


  onLogout()
  {
    this.sto.clear();
    this.router.navigate(["/home/logout"]);
  }


marketplace()
{
  this.m=true;
  this.n=false;
  this.h=false;
}

newitem()
{
  this.m=false;
  this.n=true;
  this.h=false;
}

history()
{
  this.m=false;
  this.n=false;
  this.h=true;
}

  }



 


