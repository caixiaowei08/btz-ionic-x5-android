import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {HttpStorage} from '../../providers/httpstorage';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public httpstorage: HttpStorage,
              public storge: Storage) {
    this.clear();
  }

  account: string = "";
  password: string = "";
  pwm: any;
  pwmuser: any;
  pwmopw: any;
  pwmnpw: any;
  pwf: any;
  pwfs: any;
  pwfuser: any;
  pwfyzm: any;
  pwfpwd: any;

  login() {
    var this_ = this;
    this.httpstorage.getHttp('/app/loginController.do?login&userId=' + this.account + '&userPwd=' + this.password, (data) => {
      if (data != null) {
        if (data.returnCode) {
          let user: any = {
            token: data.content.token,
            userId: data.content.userId,
            userName: data.content.userName
          }
          this_.storge.set("user", user).then((data) => {
              this_.navCtrl.setRoot(TabsPage);
            }
          ).catch((err) => {
            let alert = this.alertCtrl.create({
              title: '系统通知',
              subTitle: JSON.stringify(err),
              buttons: ['好'],
            });
            alert.present();
          });
        }
        else {
          let alert = this.alertCtrl.create({
            title: '系统通知',
            subTitle: "账号或者密码错误！",
            buttons: ['好']
          });
          alert.present();
        }
      } else {
        let alert = this.alertCtrl.create({
          title: '系统通知',
          subTitle: '网络异常，检查网络！',
          buttons: ['好']
        });
        alert.present();
      }
    });
  }

  free() {
    var this_ = this;
    let user: any = {
      token: '',
      userId: '百词斩免登陆测试用户',
      userName: ''
    }
    this_.storge.set("user", user).then((data) => {
        this_.navCtrl.setRoot(TabsPage);
      }
    ).catch((err) => {
      let alert = this.alertCtrl.create({
        title: '系统通知',
        subTitle: JSON.stringify(err),
        buttons: ['好'],
      });
      alert.present();
    });
  }

  clear() {
    this.pwm = false;
    this.pwmuser = "";
    this.pwmopw = "";
    this.pwmnpw = "";
    this.pwf = false;
    this.pwfs = true;
    this.pwfuser = "";
    this.pwfyzm = "";
    this.pwfpwd = "";
  }

  pwfsend() {
    if (this.pwfuser == "") {
      let alert = this.alertCtrl.create({
        title: '系统通知',
        subTitle: '请先输入账号！',
        buttons: ['好']
      });
      alert.present();
    }
    else {
      this.httpstorage.getHttp("/app/userController.do?sendEmail&userId=" + this.pwfuser, (data) => {
        let alert = this.alertCtrl.create({
          title: '系统通知',
          subTitle: data.msg,
          buttons: ['好']
        });
        alert.present();
        if (data.returnCode) this.pwfs = false;
      })
    }
  }

  pwfok() {
    if (this.pwfyzm != "" && this.pwfpwd != "")
      this.httpstorage.getHttp("/app/userController.do?doUpdatePwdByEmailCode&userId=" + this.pwfuser + "&newPwd=" + this.pwfpwd + "&emailCode=" + this.pwfyzm, (data) => {
        let alert = this.alertCtrl.create({
          title: '系统通知',
          subTitle: data.msg,
          buttons: ['好']
        });
        alert.present();
        if (data.returnCode) this.clear();
      })
  }

  pwmok() {
    this.httpstorage.getHttp("/app/userController.do?doUpdatePwdByOldPwd&userId=" + this.pwmuser + "&newPwd=" + this.pwmnpw + "&oldPwd=" + this.pwmopw, (data) => {
      let alert = this.alertCtrl.create({
        title: '系统通知',
        subTitle: data.msg,
        buttons: ['好'],
      });
      alert.present();
      if (data.returnCode) {
        this.clear();
      }
    })
  }

  forget() {
    this.pwf = true;
  }

  mod() {
    this.pwm = true;
  }
}
