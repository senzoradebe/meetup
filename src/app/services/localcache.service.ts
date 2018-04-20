import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE,SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

import 'rxjs/Rx';

@Injectable()
export class LocalCacheService {
  
  data:any = [];

  // https://www.js-tutorials.com/javascript-tutorial/use-localstorage-sessionstorage-using-webstorage-angular4/
  
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { 
  }

  saveInLocal(key, val): void {
    console.log('received= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }

  getFromLocal(key): any {
    console.log('received= key:' + key);
    this.data[key]= this.storage.get(key);
    return this.storage.get(key);
  }
  
  removeFromLocal(key): any {
    console.log('remove= key:' + key);
    this.storage.remove(key);
  }
    
}

