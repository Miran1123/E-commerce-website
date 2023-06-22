import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productvarities',
  templateUrl: './productvarities.component.html',
  styleUrls: ['./productvarities.component.css']
})
export class ProductvaritiesComponent implements OnInit {

  product : any
  formdata:any
  id:any;

  constructor(private api : ApiService, private route : ActivatedRoute) { }

  bind(){
    this.api.post("product/get", {data:{id:this.id}}).subscribe((result:any)=>{
      this.product=result.data;
      console.log(this.product)
      //console.log(result)
      //this.bind()

    })

    this.formdata= new FormGroup({
      id : new FormControl(this.id),
      color : new FormControl("", Validators.required),
      size : new FormControl("", Validators.required),
      mrp : new FormControl(0, Validators.required),
      price : new FormControl(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get("id")
    this.bind()
  }

  onClickSubmit(data : any){
    let object = {
      id: this.id,
      variety : {
        color : data.color,
        size : data.size,
        mrp : data.mrp,
        price : data.price
      }
    }
    this.api.post("product/savevariety", {data:object}).subscribe((result)=>{
      console.log(result)
      this.bind()
    })
  }

  deleteVariety(variety:any){
    if(confirm("Sure to delete?")){
      let obj = {id : this.id, variety : variety}
      this.api.post("product/deletevariety", {data:obj}).subscribe((result:any)=>{
        //console.log(result);
        this.bind();
      })
    }
    //console.log(variety)
  }

}
