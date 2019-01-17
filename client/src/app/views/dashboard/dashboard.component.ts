import { Component, OnInit } from '@angular/core';
import { HttpRequestManagerService } from '../../http-request-manager/http-request-manager.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  constructor(private httpRequestManager:HttpRequestManagerService){

  }
  public settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      phone:{
       title:'Phone Number'
      },
      website:{
        title:'Website'
      }
    },
    actions: false
  };
  source;
  ngOnInit(){
   return this.httpRequestManager.get("assets/json/Users.json").subscribe(res=>{
    this.source = res;
   })
  }

}
