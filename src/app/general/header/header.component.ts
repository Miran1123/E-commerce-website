import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api : ApiService, private router : Router) { }

  adminloggedin = false;
  userloggedin=false;
  username='';
  categories : any;
  cartCount=0;

  ngOnInit(): void {
    if(localStorage.getItem("usertype")==='admin'){
      this.adminloggedin=true;
    }

    if(localStorage.getItem("usertype")==='user'){
      this.userloggedin=true;
      this.username=localStorage.getItem("name") || "";
    }

    this.api.post("productcategory/list", {}).subscribe((result:any)=>{
      this.categories= result.data;
    })
    if(localStorage.getItem("products")!=null){
     let products= JSON.parse(localStorage.getItem("products") || "[]")
     this.cartCount=products.length;
    }
  }
  logout(){
    localStorage.clear()
    //this.router.navigate(['/'])
    window.location.replace("/");
  }

}
