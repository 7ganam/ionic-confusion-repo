import { Component, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CommentPage } from '../../pages/comment/comment';
import {  ModalController } from 'ionic-angular';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  new_comment : Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
    )
     {
        this.dish = navParams.get('dish');
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
        this.favorite = favoriteservice.isFavorite(this.dish.id);
     }

     addToFavorites() {
      console.log('Adding to Favorites', this.dish.id);
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
      this.toastCtrl.create({
        message: 'Dish ' + this.dish.id + ' added as favorite successfully',
        position: 'middle',
        duration: 3000}).present();
    }


  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad DishdetailPage');
  }

  
  presentActionSheet()
 {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
            }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            this.openComment() ;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
 
  openComment() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(data => { console.log(data);
    this.new_comment = data;
    this.dish.comments.push(this.new_comment);
    });

    modal.present();
  }

}