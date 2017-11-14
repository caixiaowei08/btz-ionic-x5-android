import { Component } from '@angular/core';
import { AlertController,NavController, NavParams} from 'ionic-angular';
import { HttpStorage } from '../../providers/httpstorage';

@Component({
  selector: 'page-find',
  templateUrl: 'find.html'
})
export class FindPage {
  subject:any;
  target:any;
  items:any;
  constructor(public alertCtrl:AlertController,public navCtrl: NavController,public navParams: NavParams,public httpstorage:HttpStorage) {
    this.target="";
    this.items=[];
    this.httpstorage.getStorage("subject",(data)=>{
      this.subject=data;
    })
  }
  getItems(ev: any){
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items=[];
      this.httpstorage.getStorage("s"+this.subject.id+"i1",(data)=>{
        if(data!=null)
        for(let e of data.exam){
          if(e.title.indexOf(val)>=0) this.items.push(e);
        }
        this.httpstorage.getStorage("s"+this.subject.id+"i2",(data)=>{
          if(data!=null)
          for(let e of data.exam){
            if(e.title.indexOf(val)>=0) this.items.push(e);
          }
          this.httpstorage.getStorage("s"+this.subject.id+"i4",(data)=>{
            if(data!=null)
            for(let e of data.exam){
              if(e.title.indexOf(val)>=0) this.items.push(e);
            }
            if(this.items.length==0){
              let alert = this.alertCtrl.create({
                title: '未搜索到相关内容',
                buttons: ['好的']
              });
              alert.present();
            }
          });
        });
      })
    }
  }
}
