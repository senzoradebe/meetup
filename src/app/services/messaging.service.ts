import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessagingService {
  constructor(private http: Http) { }
  client_id :    string ;
  redirect_uri : string; 
 
  getCategories(): any {
    var url = "https://api.meetup.com/2/categories?key=3ac1024453021a2d1631717d39d5&sign=true"
    return this.http.get(url)
    .map(
      (response: Response) => {
          var data = response.json();
          return data;  
        }
      )
      .catch(
        (error: Response) => {
          console.log(error)
          return Observable.throw('Something went wrong');
        }
      );
  }

  constructCategoryField(categories: number[]) : string {
    var str = ""

    for(var i = 0 ;i < categories.length - 1;i++){
      str+= categories[i] + ",";
    }

    str += categories[categories.length - 1];
    
    return str;
  }

  getGroupsByCategories(categories: number[]): any {

    var url = "https://api.meetup.com/find/groups?key=3ac1024453021a2d1631717d39d5"
      + "&country=za"      
      + "&city=johannesburg"
      + "&category="  + this.constructCategoryField(categories)
      + "&sign=true";

      return this.http.get(url)
        .map(
          (response: Response) => {
              var data = response.json();
              // other filter here  
              return data;
            }
          )
        .catch(
          (error: Response) => {
            console.log(error)
            return Observable.throw('Something went wrong');
          }
        );
  }
}
