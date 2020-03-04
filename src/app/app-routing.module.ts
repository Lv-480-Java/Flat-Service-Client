import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FlatListComponent} from './flat-list/flat-list.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'profile',      component: ProfileComponent },
  { path: 'flats',      component: FlatListComponent },
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
