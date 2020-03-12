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
import {RequestsComponent} from './admin-panel/requests/requests.component';
import {FlatRequestsComponent} from './admin-panel/requests/flat-requests/flat-requests.component';
import {LandlordRequestsComponent} from './admin-panel/requests/landlord-requests/landlord-requests.component';
import {ModeratorRequestsComponent} from './admin-panel/requests/moderator-requests/moderator-requests.component';
import {StatisticsComponent} from './admin-panel/statistics/statistics.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileUserComponent} from './profile-user/profile-user.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'comments', component: ListCommentsPageComponent},
      {path: 'user', component: ListUserPageComponent},
      {path: 'posts', component: ListPostsPageComponent},
      {
        path: 'requests', component: RequestsComponent, children: [
          {path: 'flats', component: FlatRequestsComponent},
          {path: 'landlords', component: LandlordRequestsComponent},
          {path: 'moderators', component: ModeratorRequestsComponent}
        ]
      },
      {path: 'statistics', component: StatisticsComponent}
    ]
  },

  {path: 'data', component: ProfileUserComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'flats', component: FlatListComponent},
  {path: 'detailed/:id', component: FlatDetailedComponent},
  {
    path: '',
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
