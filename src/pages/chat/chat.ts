import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  texto = '';
  username = '';
  messages = [];
  clave;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _user:UserProvider) {
    this.clave = this.navParams.get('clave');
    this.username = this.navParams.get('name');
    this.messages = this.navParams.get('msg');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage() {
    
    /*this.messages.push({
      from: 'nickname',
      msg: this._user.respuesta,
      fecha: this._user.getFecha()
    });*/

    for(let op of this._user.messages) {
      if(op.id == this.clave) {
        op.msg.push({
          from: 'nickname',
          msg: this._user.respuesta,
          fecha: this._user.getFecha()
        })
      }
    }
    this._user.sendMsg(this.clave,this._user.respuesta,this._user.name);
    this._user.respuesta = '';

  }

}
