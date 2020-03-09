import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FlatListComponent} from './flat/flat-list/flat-list.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './admin-panel/dashboard-page/dashboard-page.component';
import {ListCommentsPageComponent} from './admin-panel/list-comments-page/list-comments-page.component';
import {ListUserPageComponent} from './admin-panel/list-user-page/list-user-page.component';
import {ListPostsPageComponent} from './admin-panel/list-posts-page/list-posts-page.component';
import {FlatDetailedComponent} from './flat/flat-detailed/flat-detailed.component';
import {ChatComponent} from './chat/chat.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileUserComponent} from './profile-user/profile-user.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'admin', component: AdminLayoutComponent, children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'comments', component: ListCommentsPageComponent},
      {path: 'user', component: ListUserPageComponent},
      {path: 'posts', component: ListPostsPageComponent}
    ]
  },
  { path: 'data', component: ProfileUserComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'flats', component: FlatListComponent },
  { path: 'detailed/:id', component: FlatDetailedComponent },
  { path: '',
    redirectTo: '/flats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
