import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationComponent} from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {HttpUserService} from './services/http.user.service';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatListComponent} from './flat-list/flat-list.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatChipsModule} from '@angular/material/chips';
import {FlatFilterComponent} from './flat-filter/flat-filter.component';
import {Ng5SliderModule} from 'ng5-slider';
import {FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ProfileComponent} from './profile/profile.component';
import {MenuComponent} from './menu/menu.component';
import {FlatDetailedComponent} from './flat-detailed/flat-detailed.component';
import {GalleryModule} from '@ngx-gallery/core';
import {ListUserPageComponent} from './admin-panel/list-user-page/list-user-page.component';
import {ListPostsPageComponent} from './admin-panel/list-posts-page/list-posts-page.component';
import {ListCommentsPageComponent} from './admin-panel/list-comments-page/list-comments-page.component';
import {DashboardPageComponent} from './admin-panel/dashboard-page/dashboard-page.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChatComponent} from './chat/chat.component';
import {RequestsComponent} from './admin-panel/requests/requests.component';
import {FlatRequestsComponent} from './admin-panel/requests/flat-requests/flat-requests.component';
import {LandlordRequestsComponent} from './admin-panel/requests/landlord-requests/landlord-requests.component';
import {ModeratorRequestsComponent} from './admin-panel/requests/moderator-requests/moderator-requests.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {UserCommentComponent} from './comment/user-comment/user-comment.component';
import {FlatCommentComponent} from './comment/flat-comment/flat-comment.component';
import { StatisticsComponent } from './admin-panel/statistics/statistics.component';
import { ActiveCountComponent } from './admin-panel/statistics/active-count/active-count.component';
import { DiagramUsersComponent } from './admin-panel/statistics/diagram-users/diagram-users.component';
import { DiagramFlatsComponent } from './admin-panel/statistics/diagram-flats/diagram-flats.component';
import { UserChartComponent } from './admin-panel/statistics/user-chart/user-chart.component';
import { FlatChartComponent } from './admin-panel/statistics/flat-chart/flat-chart.component';
import { UsersLineChartComponent } from './admin-panel/statistics/users-line-chart/users-line-chart.component';
import { CommentsLineChartComponent } from './admin-panel/statistics/comments-line-chart/comments-line-chart.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DiagramCommentsComponent } from './admin-panel/statistics/diagram-comments/diagram-comments.component';

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
    RequestsComponent,
    FlatRequestsComponent,
    LandlordRequestsComponent,
    ModeratorRequestsComponent,
    UserCommentComponent,
    FlatCommentComponent,
    StatisticsComponent,
    ActiveCountComponent,
    DiagramUsersComponent,
    DiagramFlatsComponent,
    UserChartComponent,
    FlatChartComponent,
    UsersLineChartComponent,
    CommentsLineChartComponent,
    DiagramCommentsComponent
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
        MatPaginatorModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatDatepickerModule
    ],
  providers: [HttpUserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
