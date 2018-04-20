import { Component, OnInit } from '@angular/core';
import { LocalCacheService } from '../services/localcache.service';
import { MessagingService } from '../services/messaging.service';

import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
	groups: 			any[] 		= [];
	categoryIds: 		number[] 	= [];
	categories:			any[]		= [];
	filters_value: 		any[] 		= []
	filters_id: 		number[] 	= []
	temp_filter_value: string 		= "";
	temp_filter_id: 	number;
	private _success = new Subject<string>();
	tempFilterObj: 		{} ;
	staticAlertClosed = false;
	successMessage: string;
    errorMessage: string;
    alertType: string;

	constructor(private localCacheService: LocalCacheService, 
		private messagingService: MessagingService) { }

	ngOnInit() {
		this._success.subscribe((message) => this.successMessage = message);
		debounceTime.call(this._success, 2500).subscribe(() => this.successMessage = null);
		this.loadDefaultCategory();
		this.loadGroups(this.filters_id);
	}

	getDescription(str: string){
		return str.substring(0,100) + "....";
	}

	loadDefaultCategory() {
		var id = Number(this.localCacheService.getFromLocal("default-category-id"));
		this.filters_id.push(id);
	}

	onCategoryChange(event: any) : void {
		console.log(event);
		if(!(event === undefined || event === null)) {
			this.temp_filter_id = Number(event.id);
			this.temp_filter_value = event.value;
		} else {
			this.temp_filter_id = null;
			this.temp_filter_value = null;
		}
	}

	hasDuplicateId(id:number): boolean {
		for(var item of this.filters_id){
			if(id === item){
				return false;
			}
		}
		return true;
	}

	addFilter() : void {
		console.log("id    :"  + this.temp_filter_id);
		console.log("value :"  + this.temp_filter_value);

		if(this.temp_filter_id === undefined || this.temp_filter_id === null){
			this.alertType = "danger";
			this._success.next('Filter Added Successful');
		}
		this._success.next('Message successfully changed.');
		if(!(this.temp_filter_id === undefined || this.temp_filter_value === null)
			&& this.hasDuplicateId(this.temp_filter_id)) {
			this.filters_id.push(this.temp_filter_id);
			this.filters_value.push(this.temp_filter_value)
			this.temp_filter_id = null;
			this.temp_filter_value = null;
		}

		console.log("array before: " + this.filters_id)
		
		// https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
		
		if(this.filters_id.length > 1){
			for(var i = this.filters_id.length - 1; i >= 0; i--) {
				if(this.filters_id[i] === 0) {
					this.filters_id.splice(i, 1);
				}
			}
		}
		
		console.log("array after: " + this.filters_id);
		
		this.loadGroups(this.filters_id);
		this.alertType = "success";
		this._success.next('Filter Added Successful');
	}

	showAlert(): void {
		setTimeout(() => this.staticAlertClosed = true, 3000);
		this._success.subscribe((message) => this.successMessage = message);
		debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
	}

	getDefaultCategory() : string {
		return this.localCacheService.getFromLocal("default-category-value") || "Not Selected.";
	}

	loadGroups(categoryids : number[]) : void {
		console.log("Loading groups for category ids: "  + this.filters_id);

		this.messagingService.getGroupsByCategories(this.filters_id).subscribe(
	        (suc : any) => {

	        	this.groups = suc;
	        	console.log("groups loaded successfully");
	        	console.log(this.groups)
	        },
	        err => {
	            console.log(err);
	        }
	    );
	}
}
