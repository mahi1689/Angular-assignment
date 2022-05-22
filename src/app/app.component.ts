import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularcrud';
  data1:any;

  arr=["kohli","dhoni","abd","chahal"]
  name="Mahesh.M";

  nametemplatecreate:any
  categorytemplatecreate:any
  descriptiontemplatecreate:any

  nametemplatemodify:any
  categorytemplatemodify:any
  descriptiontemplatemodify:any

  tsId:any
  tsIndex:any


  url="http://localhost:3000/details"
  constructor(private http:HttpClient)
  {
    //get is used to read the data
       this.http.get(this.url).subscribe(dataFromJson=>{this.data1=dataFromJson})
  }

  onsubmitCreate(dataCreate: any){
    console.log(dataCreate.value)
    this.http.post(this.url,dataCreate.value).subscribe(res=>(this.data1.push(res)))

  }

  ondelete(deletedata:any)
  {
    console.log(deletedata.id)
    this.http.delete(this.url+"/"+deletedata.id).subscribe(()=>{
      let indexfetch= this.data1.indexOf(deletedata)
      console.log(indexfetch)
      this.data1.splice(indexfetch,1)
    })
  }

  //update opeartion
  //1. get the data from the sever

  update(updatedata:any){
    console.log(updatedata)
   this.nametemplatemodify=updatedata.namejson
   this.categorytemplatemodify=updatedata.category
   this.descriptiontemplatemodify= updatedata.description
   this.tsId = updatedata.id
   this.tsIndex=this.data1.indexOf(updatedata)
  }

  //2.edit/update insert back those data in server
  onModify(datModify:any)
  {
    console.log(datModify)
//http://localhost:3000/details/4
    this.http.put(this.url+"/"+this.tsId,datModify.value).subscribe(()=>{
     this.data1[this.tsIndex]=datModify.value
    })
  }

  
}
