import { Component,OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { ChatPage } from '../chat/chat';

interface Datos {
  user;
  email;
  data;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  home;

  constructor(public navCtrl: NavController,
              public _user:UserProvider,
              ) {
     this.home = this._user.getUsers().subscribe((resp:Datos) => {
       console.log('Entre Agregar Mensaje')
       let info = resp.data;
       let nom = 'Usuario N°'+ (this._user.messages.length + 1);
       if(!this._user.validUser(info.id)) {
        this._user.messages.push({
          id: info.id,
          name: nom,
          msg: []
        })
       }

        for(let op of this._user.messages) {
          if(op.id == info.id) {
            op.msg.push({
              from: 'user',
              msg:info.msg,
              fecha: info.fecha
            });
            break;
          }
        }
        
       
     })
  }

  ionViewDidLoad() {
    
  }

  

  closeLogin() {
    this._user.closeStorage().then(() => {
      this.navCtrl.setRoot(LoginPage);
      this._user.setDisconnect();
    });
  }

  irChat(id,name,msg) {
    console.log('ID');
    console.log(id);
    this.navCtrl.push(ChatPage,{
      clave: id,
      name,
      msg
    })
    
    
  }

  ngOnDestroy() {
    this.home.unsubscribe();
  }


}
