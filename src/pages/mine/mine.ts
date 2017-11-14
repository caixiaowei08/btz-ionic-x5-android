import {Component} from '@angular/core';
import {App, NavController, ViewController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {FilePage} from '../file/file';
import {FindPage} from '../find/find';
import {MsgPage} from '../msg/msg';
import {HttpStorage} from '../../providers/httpstorage';

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  user: string;
  darkmode: any;
  newmsg: any;
  constructor(private app: App,
              private navCtrl: NavController,
              private viewCtrl: ViewController,
              private httpstorage: HttpStorage) {
    this.user = "";
    this.newmsg = false;
  }

  ionViewDidEnter() {
    this.httpstorage.getStorage('user', (data) => {
      this.user = data.userId;
      this.httpstorage.getHttp("/app/feedbackController.do?doGetFeedBackInfo&token=" + data.token, (data) => {
        if (data != null && data.returnCode && data.content) {
          let flg = false;
          for (let v of data.content) {
            if (v.flag == 0) {
              flg = true;
              break;
            }
          }
          if (flg) this.newmsg = true;
        }
      })
    })
  }

  ionViewDidLoad() {
  }

  goMsg() {
    this.navCtrl.push(MsgPage);
  }

  goVideo() {
    this.navCtrl.push(FilePage);
  }

  goFind() {
    this.navCtrl.push(FindPage);
  }

  dark() {
    if (this.darkmode) this.app.setElementClass("darkmode", true);
    else this.app.setElementClass("darkmode", false);
  }

  logout() {
    this.httpstorage.delStorage('user');
    this.app.setElementClass("darkmode", false);
    this.app.getRootNav().setRoot(LoginPage);
  }
}
