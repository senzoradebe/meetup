import { Component, Input, OnChanges, SimpleChange, Output, OnInit, EventEmitter } from '@angular/core';
import { MessagingService } from '../services/messaging.service';
import { LocalCacheService } from '../services/localcache.service';
// https://angular.io/guide/component-interaction
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
	@Input() categoryList: {}[];
  	@Output() onCategoryChanged = new EventEmitter<{}>()
  	categories:				any[] 	= [];
  	selectedCategoryId: 		number;
  	selectedCategoryValue: 	string;

  	constructor(private messagingService: MessagingService, private localCacheService: LocalCacheService ) { }

  	ngOnInit() {
  		this.loadCategories();
  	}

  	loadCategories() : void { 
  		this.messagingService.getCategories().subscribe(
  			(suc : any) => {
  				console.log("loading categories");
  				this.categories = suc.results;
  			},
  			err => { console.log(err);}
  			);
  	}
  	
  	selectCategory(id :string) {
  		var selectedCategoryObject = this.categories.find(s => s.id == id);
  		this.selectedCategoryValue = selectedCategoryObject.name; 
  		this.onCategoryChanged.emit({"id" : id , "value": this.selectedCategoryValue });
  		console.log("selected category name: " + this.selectedCategoryValue);
  		console.log("selected category id: " + this.selectedCategoryId);
  }
}
