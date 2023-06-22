import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {



  orderid : string = ''
  products : any;
  formdata : any
  baseurl = this.api.baseurl
  subtotal=0;
  grandtotal=0
  delivery=50;

  constructor(private router : Router, private api : ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem("usertype")==null){
      this.router.navigate(['/login'])
    }
    if(localStorage.getItem("usertype")!="user"){
      this.router.navigate(['/login'])
    }
    this.bind()
  }

  bind(){

    this.formdata = new FormGroup({
      userid : new FormControl(localStorage.getItem("id")),
      address : new FormControl("", Validators.required),
      city : new FormControl("", Validators.required),
      state : new FormControl("", Validators.required),
      pincode : new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)]) ),
    })

    this.products=JSON.parse(localStorage.getItem("products") || "[]")
    //console.log(this.products)
    this.subtotal=0;
    this.grandtotal=0;
    this.delivery=50
    for(let i=0; i<this.products.length; i++){
      this.subtotal+=this.products[i].price*this.products[i].quantity;
    }
    this.grandtotal=this.subtotal+this.delivery
    if(this.products.length ==0 ){
      this.router.navigate(['/'])
    }
  }


  onClickSubmit(data : any){

    let orderproducts = new Array();
    this.products.forEach((product : any) => {
      let orderproduct = {
        productid : product.id,
        name : product.name,
        color : product.color,
        size : product.size,
        quantity : product.quantity,
        price : product.price,
        total : product.quantity*product.price
      }
      orderproducts.push(orderproduct)
    });

    let object = {
      userid : data.userid,
      address : data.address,
      city : data.city,
      state : data.state,
      pincode : data.pincode,
      totalamount : this.subtotal,
      shipmentamount : this.delivery,
      billamount : this.grandtotal,
      products : orderproducts

    }

    this.api.post("order/place", {data:object}).subscribe((result : any)=>{
      this.orderid = result.data._id;
      console.log(this.orderid)
    })

    this.router.navigate(['/ordersuccess'])
  }



}
