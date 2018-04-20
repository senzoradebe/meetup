import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MessagingService } from '../services/messaging.service'
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

	constructor(private messagingService: MessagingService,
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute) {
	}

	ngOnInit() {}
	
}
