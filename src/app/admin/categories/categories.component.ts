import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : any
  formdata:any
  message=""
  fileContent: any='';
  imagestring : any = '';
  imageused : any =''

  constructor(private api : ApiService) { }
  baseurl = this.api.baseurl

  ngOnInit(): void {
    this.bind();


  }

  bind(){
    this.api.post('productcategory/list', {}).subscribe((result : any)=>{
      this.categories=result.data
      console.log(this.categories)
    })
    this.formdata=new FormGroup(
      {
        id:new FormControl(""),
        name:new FormControl("", Validators.required),
        srno:new FormControl("", Validators.required),
        image:new FormControl('')
      }
    )
  }

  onClickSubmit(data : any){
    //console.log(data)

    data.image=this.imagestring;
    this.imageused=this.imagestring
    //console.log(data.image)
    this.api.post("productcategory/save", {data:data}).subscribe((result)=>{
      //console.log(result)
      this.bind();
    })
  }
  imageChanged(event : any){
    this.fileContent = event.target.files[0]
    //console.log(this.fileContent);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileContent);
    reader.onload = () => {
      if(reader.result!=null)
      this.imagestring= reader.result.toString();
      console.log(this.imagestring)

  }

}
      deletecategory(id : string){
        if(confirm("sure to delete")){
          this.api.post("productcategory/delete", {data : {id : id}}).subscribe((result : any)=>{
            this.bind();
          })
        }
      }

      editcategory(id : string){
        this.api.post("productcategory/get", {data : {id : id}}).subscribe((result : any)=>{
          let category = result.data;
          this.formdata=new FormGroup(
            {
              id:new FormControl(category._id),
              name:new FormControl(category.name, Validators.required),
              srno:new FormControl(category.srno, Validators.required),
              image:new FormControl('')
            }
          )
        })
      }

}
