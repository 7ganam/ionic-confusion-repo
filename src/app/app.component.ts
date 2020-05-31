import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { DishdetailPage } from '../pages/dishdetail/dishdetail';
import { Http } from '@angular/http';
import { FavoritesPage } from '../pages/favorites/favorites';
import {  ModalController } from 'ionic-angular';

import { ReservationPage } from '../pages/reservation/reservation';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'About Us', icon: 'information-circle', component: AboutPage },
      { title: 'Menu', icon: 'list-box', component: MenuPage },
      { title: 'Contact Us', icon: 'contact', component: ContactPage },
      { title: 'Favorites', icon: 'restaurant', component: FavoritesPage },

    ];

  }
  openReserve() {

    let modal = this.modalCtrl.create(ReservationPage);
    modal.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
