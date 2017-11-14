import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@Injectable()
export class HttpStorage {
  url:string="http://contact.app.baitizhan.com";
  //url:string="http://59.78.194.121:8080";
  constructor(private http: Http,private storage:Storage,) {
  }
  getHttp(url,callback){
    let obj=this.http.get(this.url+url).subscribe((data)=>{
      callback(data.json());
    },(error)=>{
      callback(null);
    })
  }
  postHttp(url,body,callback){
    this.http.post(this.url+url,body).subscribe((data)=>{
      callback(data.json());
    },(error)=>{
      callback(null);
    })
  }
  getStorage(key,callback){
    this.storage.get(key).then((data) => {
      callback(data);
    })
  }
  setStorage(key,value){
    this.storage.set(key,value);
  }
  delStorage(key){
    this.storage.remove(key);
  }
  delAllStorage(){
    this.storage.clear();
  }
}
