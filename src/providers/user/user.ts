import { Injectable } from '@angular/core';

import { Socket } from 'ng-socket-io';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

interface Datos {
  status;
  users;
  email;
  data;
}

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  respuesta:String = '';
  clave;
  messages = [];
  users = [];
  name:String = '';

   constructor(private socket: Socket,
              private platform:Platform,
              private storage: Storage,
              ) {
    console.log('Hello UserProvider Provider');
    /*
    this.getUsers().subscribe((resp:Datos) => {
      this.users.push(resp);
      this.messages.push({
        email:resp.email,
        msj: []
      });
    })

    this.getMsj().subscribe((resp:Datos) => {
      let index = this.messages.findIndex((ele) => {
        return ele.email == resp.email;
      })
      this.messages[index].msj.push(resp.data);
    })*/
  }

  setConexion() {
    this.socket.connect();
  }

  setDisconnect() {
    this.socket.disconnect();
  }

  setAllUsers(clave) {
    this.socket.emit('all-users',{clave});
    this.socket.fromEvent('all-users-resp').subscribe((resp:Datos) => {
      this.users = resp.users;
    })
  }

  getUsers() {
    return this.socket.fromEvent('all-users');
  }

  getMsj() {
    return this.socket.fromEvent('msg-user');
  }

  sendMsg(clave,msg,name) {
    this.socket.emit('msg-emp',{clave,msg,name})
  }
  

  setLogin(clave) {
    this.setConexion();
    this.socket.emit("login-app", {clave})
    let promesa = new Promise((resolve,reject) => {
      let login = this.socket.fromEvent('login-resp').subscribe((resp:Datos) => {
        if(resp.status) {
          this.clave = clave;
          this.saveStorage();
          resolve(resp.data);
        }
        else {
          reject();
        }
        login.unsubscribe();

      })
    
    })

    return promesa;
  }

  saveStorage() {
    if(this.platform.is('cordova')) {
      //celular
      this.storage.set('clave', this.clave);
    }
    else {
      localStorage.setItem('clave',this.clave);
    }
  }

  loadStorage() {
    return new Promise((resolve,reject) => {
      if(this.platform.is('cordova')) {
        //celular
        this.storage.get('clave').then(val => {
          if(val) {
            this.clave = val;
            resolve(true)
          }
          else {
            resolve(false);
          }
        })
      }
      else {
        if(localStorage.getItem('clave')) {
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }
        else {
          resolve(false);
        }
      }
    })
  }

  closeStorage() {
    return new Promise((resolve,reject) => {
      this.messages = [];
      this.users = [];
      if(this.platform.is('cordova')) {
        this.storage.remove('clave').then((val) => {
          resolve();
        })
      }
      else {
        this.clave = null;
        localStorage.removeItem('clave');
        resolve();
      }
    })
  }

  validUser(id) {
    let ind = false;
    for(let op of this.messages) {
      if(id == op.id) {
        ind = true;
        break;
      }
    }

    return ind;
  }


  getFecha() {
    let date = new Date();
    let day = this.zero(date.getDay());
    let mes = this.zero(date.getMonth());
    let ano = this.zero(date.getFullYear());
    let hora = this.zero(date.getHours());
    let min = this.zero(date.getMinutes());

    return hora+':'+min+' '+day+'/'+mes+'/'+ano;
  }

  zero(num) {
      let valor = '';
      if(num<10) valor = '0'+num;
      else valor = ''+num

      return valor;
  }

}
