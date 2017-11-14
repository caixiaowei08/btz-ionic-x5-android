import { Component } from '@angular/core';
import { ModalController,NavController, NavParams} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HttpStorage } from '../../providers/httpstorage';
import { NullPage } from '../null/null';
import { PlayPage } from '../play/play';
import * as $ from "jquery";

@Component({
  selector: 'page-file',
  templateUrl: 'file.html'
})
export class FilePage {
  video:Array<{id:string,time:string,tit:string}>;
  url:any;
  si:any;
  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public navParams: NavParams,public file:File,public httpstorage:HttpStorage) {
    this.video=null;
    this.si=0;
    /*
    this.file.listDir(this.file.dataDirectory,"").then((data)=>{
      for(let f of data){
        let s1=f.name;
        this.httpstorage.getStorage("vd",(data)=>{
          for(let val of data){
            let s2=val.id+".mp4";
            if(s1==s2) this.video.push(val);
            break;
          }
        })
      }
    })
    */
    this.httpstorage.getStorage("vd",(data)=>{
      if(data==null){
        data=[];
        this.httpstorage.setStorage("vd",data);
      }
      this.video=data;
    })
  }
  getDate(i){
    let date=new Date(this.video[i].time);
    let h=date.getHours();
    let hh=h<10?"0"+h:h;
    let m=date.getMinutes();
    let mm=m<10?"0"+m:m;
    let s=date.getSeconds();
    let ss=s<10?"0"+s:s;
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+"  "+hh+":"+mm+":"+ss;
  }
  setUrl(i){
    //$("#videosf").show();
    this.si=i;
    this.url=this.file.dataDirectory+this.video[i].id+".mp4";
    let modal=this.modalCtrl.create(PlayPage,{url:this.url,title:this.video[i].tit});
    modal.present();
    //var video=$("#videos")[0];
    //if (video.paused) video.play();
    //else video.pause();
  }
  delete(i){
    let id=this.video[i].id;
    this.file.removeFile(this.file.dataDirectory,id+'.mp4');
    this.video.splice(i,1);
    this.httpstorage.setStorage("vd",this.video);
    /*
    this.httpstorage.getStorage("vd",(data)=>{
      if(data==null) data=[];
      let newdata=[];
      for(let w of data){
        if(w.id!=id) newdata.push(w);              
      }
      this.video=newdata;
      this.httpstorage.setStorage("vd",newdata);
    })
    */
  }
  ionViewDidEnter(){
  }
}
