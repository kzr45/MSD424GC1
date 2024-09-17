import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from './service/auth.service'; 
import { FormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterModule, 
    HttpClientModule, 
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
