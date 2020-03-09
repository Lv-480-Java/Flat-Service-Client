import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FlatListComponent} from './flat-list/flat-list.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './admin-panel/dashboard-page/dashboard-page.component';
import {ListCommentsPageComponent} from './admin-panel/list-comments-page/list-comments-page.component';
import {ListUserPageComponent} from './admin-panel/list-user-page/list-user-page.component';
import {ListPostsPageComponent} from './admin-panel/list-posts-page/list-posts-page.component';
import {FlatDetailedComponent} from './flat-detailed/flat-detailed.component';
import {ChatComponent} from './chat/chat.component';
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
  { path: 'profile', component: ProfileComponent },
  { path: 'data', component: ProfileUserComponent},
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
