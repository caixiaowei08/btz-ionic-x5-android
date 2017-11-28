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
    this_.httpstorage.postHttp('/app/loginController.do?loginPost', JSON.stringify({
      userId: this_.account,
      userPwd: this_.password
    }), (data) => {
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

  //验证码修改码 修改密码
  pwfok() {
    var this_ = this;
    if (this_.pwfyzm != "" && this_.pwfpwd != "") {
      this_.httpstorage.postHttp('/app/userController.do?doUpdatePwdByEmailCodePost', JSON.stringify({
        userId: this_.pwfuser,
        newPwd: this_.pwfpwd,
        emailCode: this_.pwfyzm
      }), (data) => {
        let alert = this_.alertCtrl.create({
          title: '系统通知',
          subTitle: data.msg,
          buttons: ['好']
        });
        alert.present();
        if (data.returnCode) this.clear();
      });
    } else {
      let alert = this_.alertCtrl.create({
        title: '系统通知',
        subTitle: "请填写验证码和新密码！",
        buttons: ['好']
      });
      alert.present();
    }
  }

  pwmok() {
    var this_ = this;
    this_.httpstorage.postHttp('/app/userController.do?doUpdatePwdByOldPwdPost', JSON.stringify({
      userId: this_.pwmuser,
      newPwd: this_.pwmnpw,
      oldPwd: this_.pwmopw
    }), (data) => {
      let alert = this.alertCtrl.create({
        title: '系统通知',
        subTitle: data.msg,
        buttons: ['好'],
      });
      alert.present();
      if (data.returnCode) {
        this.clear();
      }
    });

  }

  forget() {
    this.pwf = true;
  }

  mod() {
    this.pwm = true;
  }
}
