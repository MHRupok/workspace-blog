import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PostDetailsComponent } from './shared/post-details/post-details.component';
import { AuthsGuard } from './services/auths.guard';
import { CreateblogComponent } from './createblog/createblog.component';
import { EditblogComponent } from './editblog/editblog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'login', component: AccountComponent },
  { path: 'myaccount', component: MyprofileComponent, canActivate: [AuthsGuard] },
  { path: 'myaccount/create_blog', component: CreateblogComponent, canActivate: [AuthsGuard]},
  { path: 'myaccount/edit/:id', component: EditblogComponent, canActivate: [AuthsGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthsGuard]
})
export class AppRoutingModule { }
