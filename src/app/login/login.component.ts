import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { FirebaseServiceService } from '../firebase-service.service';
import { validateConfig } from '@angular/router/src/config';
import { Router, ActivatedRoute } from '@angular/router';
import {SessionStorageService} from 'angular-web-storage';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _obj:FormBuilder, public _serv:FirebaseServiceService,private _router:Router,private sto:SessionStorageService) { 

  }

  signupFlag:boolean=false;
  private usersArray=[];
  ngOnInit() {
    this._serv.getUsersList().subscribe(
      list => {
        this.usersArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

 login_form=this._obj.group(
      {
      uname:[,[Validators.required]],
      pword:[,[Validators.required]],
    }
    );

    signup_Form=this._obj.group(
      {
        uname:[,[Validators.required]],
        fname:[,[Validators.required,Validators.minLength(5)]],
        pword:[,[Validators.required]],
        cpword:[,[Validators.required]]
      }
    );


    Signup()
    {
      this.signupFlag=true;
    }

    Login()
    {
      this.signupFlag=false;
    }

  onSubmit()
  {
    console.log(this.usersArray);
    for(var i=0;i<this.usersArray.length;i++)
    {
      if((this.login_form.value.uname==this.usersArray[i].username) && (this.login_form.value.pword==this.usersArray[i].password))
      {
        console.log("Welcome: "+this.usersArray[i].fullname);
        this._router.navigate(["/home/marketplace"]);
        this.sto.set('user',this.usersArray[i]);

        

      }
    }
  }

  onSignup()
  {
   
    console.log(this.signup_Form.value);
    this._serv.insertUser(this.signup_Form.value);
  }
  
  }
