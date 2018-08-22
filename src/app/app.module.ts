import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
//Login
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
const config: SocketIoConfig = { url: 'https://engine.aceleradordigitaldenegocios.com.mx', options: {
  path: '/chat'
}};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
