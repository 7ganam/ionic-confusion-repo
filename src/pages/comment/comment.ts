import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment as Comment1} from '../../shared/comment';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment_form: FormGroup;
  comment: Comment1 ;
  d = new Date();
   ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
   mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(this.d);
   da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);

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
    this.d = new Date();
    this.ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
    this.mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(this.d);
    this.da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);
   
    let cc ={
      rating: 0,
      comment: "",
      author: "",
      date: "",
  };
    cc.rating= this.comment_form.value.rating;
    cc.author= this.comment_form.value.author;
    cc.date=this.da.concat( this.mo).concat( this.ye);
    cc.comment=this.comment_form.value.comment;
    this.comment=cc;
    // this.comment.rating= this.comment_form.value.rating;
    // this.comment.author= this.comment_form.value.author;
    // this.comment.date=this.da.concat( this.mo).concat( this.ye);
    // this.comment.comment=this.comment_form.value.comment;
    console.log("EE");
    console.log(cc);
    console.log("EE");

    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(this.comment);
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(this.comment);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

}
