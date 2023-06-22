import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: any
  product : any;
  baseurl =this.api.baseurl
  quantity = 1;
  mrp =0;
  price = 0;
  size="";
  color="";
  message=""


  constructor(private api : ApiService, private route : ActivatedRoute) {

   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.api.post("product/get", {data:{id:this.id}}).subscribe((result:any)=>{
      this.product=result.data;
      console.log(this.product)
    })
    this.mrp=this.product.mrp;
    this.price=this.product.price;
    this.color=this.product.color
    this.size=this.product.size

  }

  addQuantity(){
    this.quantity+=1;
  }

  reduceQuantity(){
    if(this.quantity>=1)
    this.quantity-=1;
  }

  checkForPrice(){
    this.message="";
    if(this.size!="" && this.color!=""){
      let found=false;
      for(let i=0; i<this.product.varieties.length; i++){
        if(this.product.varieties[i].size==this.size && this.product.varieties[i].color==this.color){
          this.mrp=this.product.varieties[i].mrp;
          this.price=this.product.varieties[i].price;
          found=true;
          break;
        }
      }
      if(!found){
        this.message="Product with this size and color not available"
      }
    }else{
      this.mrp=this.product.mrp;
      this.price=this.product.price

    }
  }

  addToCart(){
    let toAddToCart=false;
    if(this.size!="" && this.color!=""){
      let found=false;
      for(let i=0; i<this.product.varieties.length; i++){
        if(this.product.varieties[i].size==this.size && this.product.varieties[i].color==this.color){
          this.mrp=this.product.varieties[i].mrp;
          this.price=this.product.varieties[i].price;
          found=true;
          break;
        }
      }
      if(!found){
        this.message="Product with this size and color not available"
      }else{
        toAddToCart=true;
      }
    }else{
      this.mrp=this.product.mrp;
      this.price=this.product.price
      toAddToCart=true;
    }
    //console.log(toAddToCart)
    if(toAddToCart){
      let product = {
        id:this.id ,
        name:this.product.name,
        imagepath:this.product.imagepath,
        color:this.color,
        size:this.size,
        quantity:this.quantity,
        mrp:this.mrp,
        price:this.price
      }
      //console.log(1)
      let products : any = new Array();
      if(localStorage.getItem("products")!=null)
      products= JSON.parse(localStorage.getItem("products") || "[]")

        let added = false;

        for(let i=0; i<products.length; i++){
          if(products[i].id==product.id && products[i].color ==product.color && products[i].size==product.size){
            alert("product already added");
            added=true;
          }
        }
        console.log(added)
        if(!added){
          products.push(product)
        //console.log(products)
        localStorage.setItem("products", JSON.stringify(products));
        alert("product added to cart")
        }
        let spn = document.getElementById("spncount")
        //console.log(spn)
        if(spn!=null)
        spn.innerText=products.length.toString();
      }
    }
  }


