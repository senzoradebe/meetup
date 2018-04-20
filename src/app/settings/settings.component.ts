import { Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LocalCacheService } from '../services/localcache.service';
import { MessagingService } from '../services/messaging.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
	
	categories: 			any[] 	= [];
	hasDefault: 			boolean = false;
	defaultCategoryValue:	string;
	selectedCategoryId: 	number;
	selectedCategoryValue:	string;
	successMessage: 		string;
	alertType: 				string;
	private _success = new Subject<string>();

	constructor(private localCacheService: LocalCacheService, 
		private messagingService: MessagingService) { }

	ngOnInit() {
		this._success.subscribe((message) => this.successMessage = message);
		debounceTime.call(this._success, 2500).subscribe(() => this.successMessage = null);
		// this.localCacheService.removeFromLocal("default-category-value");
		this.loadCategories();
		this.hasDefault = this.localCacheService.getFromLocal("default-category-value") !== null; 
		if (this.hasDefault) {
			this.defaultCategoryValue = this.localCacheService.getFromLocal("default-category-value")
		} 
	}

	loadCategories() : void { 
		this.messagingService.getCategories().subscribe(
	        (suc : any) => {
	        	console.log("loading categories");
	        	this.categories = suc.results;
	        },
	        err => {
	            console.log(err);
	        }
	    );
	}

	onCategoryChange(event: any) : void {
		console.log(event)
		if(!(event === undefined || event === null)) {
			this.selectedCategoryId = Number(event.id);
			this.selectedCategoryValue = event.value;
		} else {
			this.selectedCategoryId = null;
			this.selectedCategoryValue = null;
		}
	}

	cacheDefaultCategory() : void {
		console.log("cache value: " + this.selectedCategoryValue);
		console.log("cache id:    " + this.selectedCategoryId);
		this.localCacheService.saveInLocal("default-category-value", this.selectedCategoryValue)
		this.localCacheService.saveInLocal("default-category-id",    this.selectedCategoryId)
		this.defaultCategoryValue = this.selectedCategoryValue;
		this.alertType = "success";
		this._success.next('Preferred Category cached');
	}
	getDefaultCategory() : string {
		return this.localCacheService.getFromLocal("default-category-value") || "None";
	}
	
}
