import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  category : any
  products : any
  categoryid : any
  baseurl = this.api.baseurl;

  constructor(private api : ApiService, private route : ActivatedRoute, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute=() => false
  }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get("categoryid")
    this.bind()
  }

  bind(){
    this.api.post("productcategory/get", {data:{id:this.categoryid}}).subscribe((result:any)=>{
      this.category=result.data;
      console.log(this.category)
    })
    this.api.post("product/list", {data:{pcid:this.categoryid}}).subscribe((result:any)=>{
      this.products=result.data;
      //console.log(result)
    })
  }

}
