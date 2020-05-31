import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;
  f: Array<any>;

  constructor( private dishservice: DishProvider,
    private storage: Storage 
    ) 
    {
      this.storage.get('favs').then(favs => 
        {
          if(favs)
          {
           
            this.f = favs;
            this.f.forEach( F => {this.addFavorite(F);})
            // this.f.push(this.dish.id);
            // this.storage.set('favs',this.f);
            // this.favorites.push(f);
            // this.storage.set('favs',this.favorites);
            // this.storage.remove('favs');
          }


        });
      console.log('Hello FavoriteProvider Provider');
      this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    console.log('favorites', this.favorites);

    this.storage.set('favs',this.favorites);


    
    return true;
  }
  
  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set('favs',this.favorites);

      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}