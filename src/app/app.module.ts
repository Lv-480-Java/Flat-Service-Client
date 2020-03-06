import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {HttpUserService} from './services/http.user.service';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlatListComponent } from './flat-list/flat-list.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatChipsModule} from '@angular/material/chips';
import { FlatFilterComponent } from './flat-filter/flat-filter.component';
import { Ng5SliderModule } from 'ng5-slider';
import {FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ProfileComponent} from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { FlatDetailedComponent } from './flat-detailed/flat-detailed.component';
import { GalleryModule } from  '@ngx-gallery/core';
import { ListUserPageComponent } from './admin-panel/list-user-page/list-user-page.component';
import { ListPostsPageComponent } from './admin-panel/list-posts-page/list-posts-page.component';
import { ListCommentsPageComponent } from './admin-panel/list-comments-page/list-comments-page.component';
import { DashboardPageComponent } from './admin-panel/dashboard-page/dashboard-page.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChatComponent } from './chat/chat.component';
import { UserCommentComponent } from './comment/user-comment/user-comment.component';
import { FlatCommentComponent } from './comment/flat-comment/flat-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    FlatListComponent,
    FlatFilterComponent,
    ProfileComponent,
    MenuComponent,
    FlatDetailedComponent,
    MenuComponent,
    AdminLayoutComponent,
    ListUserPageComponent,
    ListPostsPageComponent,
    ListCommentsPageComponent,
    DashboardPageComponent,
    ChatComponent,
    UserCommentComponent,
    FlatCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    Ng5SliderModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FlexModule,
    InfiniteScrollModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    GalleryModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  providers: [HttpUserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
