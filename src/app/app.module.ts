import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { GroupsComponent } from './groups/groups.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';

import { AppRoutingModule } from './app-routing.module';
import { MessagingService } from './services/messaging.service';
import { LocalCacheService } from './services/localcache.service'
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { StorageServiceModule} from 'angular-webstorage-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    GroupsComponent,
    HeaderComponent,
    HomeComponent,
    CategoryListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StorageServiceModule
  ],
  providers: [ MessagingService, LocalCacheService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
