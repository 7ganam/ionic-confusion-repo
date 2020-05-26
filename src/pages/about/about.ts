import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  leaders: Leader[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dishservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {
  }
  
  ngOnInit() {
    this.dishservice.getLeaders()
      .subscribe(dishes => this.leaders = dishes,
        errmess => this.errMess = <any>errmess);
  }
  ionViewDidLoad()
  {
    console.log('ionViewDidLoad AboutPage');
  }

}
