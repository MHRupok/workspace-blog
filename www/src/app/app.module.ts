import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PostModelComponent } from './shared/post-model/post-model.component';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailsComponent } from './shared/post-details/post-details.component';
import { AccountComponent } from './account/account.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { EditblogComponent } from './editblog/editblog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PostModelComponent,
    PostDetailsComponent,
    AccountComponent,
    MyprofileComponent,
    CreateblogComponent,
    EditblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
