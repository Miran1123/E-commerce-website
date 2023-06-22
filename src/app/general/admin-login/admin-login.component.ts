import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  formdata:any
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.formdata=new FormGroup(
      {
        username:new FormControl("", Validators.required),
        password:new FormControl("", Validators.required)
      }
    )
  }

  message=""

  onClickSubmit(data : any){
    console.log(data)
    this.api.post('admin/login', {data:data}).subscribe((result : any)=>{
      console.log(result)
      if(result.data.status!="success"){

        this.message="username and password is incorrect"

      }else{
        localStorage.setItem("usertype", "admin")
        window.location.replace("/admin/dashboard");
      }

    })
  }

}
