import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.comment_form = this.formBuilder.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: ['', [Validators.required] ],
        comment: ['', Validators.required ]
      });
  }
  onSubmit() {
    console.log(this.comment_form.value);
    this.viewCtrl.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss("ganam");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

}
