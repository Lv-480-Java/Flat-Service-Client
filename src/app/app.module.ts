import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationComponent} from './registration/registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegistrationService} from './services/registration.service';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatListComponent} from './flat/flat-list/flat-list.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatChipsModule} from '@angular/material/chips';
import {Ng5SliderModule} from 'ng5-slider';
import {FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ProfileComponent} from './profile/profile.component';
import {DialogWindowEditUserComponent} from './admin-panel/list-user-page/dialog-window-edit-user';
import {MatDialogModule} from '@angular/material/dialog';
import {MenuComponent} from './menu/menu.component';
import {FlatDetailedComponent} from './flat/flat-detailed/flat-detailed.component';
import {GalleryModule} from '@ngx-gallery/core';
import {ListUserPageComponent} from './admin-panel/list-user-page/list-user-page.component';
import {ListPostsPageComponent} from './admin-panel/list-posts-page/list-posts-page.component';
import {ListCommentsPageComponent} from './admin-panel/list-comments-page/list-comments-page.component';
import {DashboardPageComponent} from './admin-panel/dashboard-page/dashboard-page.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChatComponent} from './chat/chat.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {UserCommentComponent} from './comment/user-comment/user-comment.component';
import {FlatCommentComponent} from './comment/flat-comment/flat-comment.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {EmojifyPipe} from './pipes/emojify.pipe';
import {LinkfyPipe} from './pipes/linkfy.pipe';
import {SanitizePipe} from './pipes/sanitize.pipe';
import {RequestsComponent} from './admin-panel/requests/requests.component';
import {StatisticsComponent} from './admin-panel/statistics/statistics.component';
import {CommentsLineChartComponent} from './admin-panel/statistics/comments-line-chart/comments-line-chart.component';
import {DiagramCommentsComponent} from './admin-panel/statistics/diagram-comments/diagram-comments.component';
import {DiagramFlatsComponent} from './admin-panel/statistics/diagram-flats/diagram-flats.component';
import {DiagramUsersComponent} from './admin-panel/statistics/diagram-users/diagram-users.component';
import {UsersLineChartComponent} from './admin-panel/statistics/users-line-chart/users-line-chart.component';
import {UserChartComponent} from './admin-panel/statistics/user-chart/user-chart.component';
import {FlatChartComponent} from './admin-panel/statistics/flat-chart/flat-chart.component';
import {ActiveCountComponent} from './admin-panel/statistics/active-count/active-count.component';
import {MatListModule} from '@angular/material/list';
import {ProfileShortComponent} from './profile-short/profile-short.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReviewWindowComponent} from './admin-panel/requests/review-window/review-window.component';
import {FlatRequestDetailComponent} from './admin-panel/requests/review-window/flat-request-detail/flat-request-detail.component';
import {UserRequestDetailComponent} from './admin-panel/requests/review-window/user-request-detail/user-request-detail.component';
import {ChatButtonComponent} from './chatbutton/chatbutton.component';
import {InterceptorService} from './services/intercept.service';
import {AddFlatComponent} from './flat/add-flat/add-flat.component';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {AutoApproveComponent} from './admin-panel/requests/auto-approve/auto-approve.component';
import {HttpErrorInterceptor} from './services/interceptors/error.interceptor';
import {ComentsaboutcommentComponent} from './comment/flat-coments-about-comment/comentsaboutcomment.component';
import {ListCommentComponent} from './comment/flat-list-comment-about-comment/list-comment.component';
import {UserCommentsAboutComentComponent} from './comment/user-comments-about-coment/user-comments-about-coment.component';
import {UserListCommentsAboutComentComponent} from './comment/user-list-comments-about-coment/user-list-comments-about-coment.component';
import {LikeComponent} from './comment/like/like.component';
import {RequestMessageComponent} from './admin-panel/requests/review-window/request-message/request-message.component';
import {MatBadgeModule} from '@angular/material/badge';
import {LandlordFlatListComponent} from './flat/landlord-flat-list/landlord-flat-list.component';
import {ComplaintComponent} from './comment/complaint/complaint.component';
import {ComplaintUCComponent} from './comment/complaint-u-c/complaint-u-c.component';
import {FlatService} from './services/flat.service';
import {FlatFilterComponent} from './flat/flat-filter/flat-filter.component';
import {FavoriteFlatComponent} from './favorite-flat/favorite-flat.component';
import {FlatBookingService} from "./services/flat-booking.service";
import {FlatRequestsComponent} from './landlord/flat-requests/flat-requests.component';
import {FlatMapComponent} from './flat/flat-map/flat-map.component';
import {AgmCoreModule} from '@agm/core';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FlatRequestReviewComponent} from './landlord/flat-request-review/flat-request-review.component';
import { ReviewAreaComponent } from './landlord/review-area/review-area.component';
import { BookingRequestsComponent } from './renter/booking-requests/booking-requests.component';


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
    AdminLayoutComponent,
    ListUserPageComponent,
    ListPostsPageComponent,
    ListCommentsPageComponent,
    DashboardPageComponent,
    ChatComponent,
    ProfileUserComponent,
    DialogWindowEditUserComponent,
    UserCommentComponent,
    FlatCommentComponent,
    EmojifyPipe,
    LinkfyPipe,
    SanitizePipe,
    RequestsComponent,
    StatisticsComponent,
    CommentsLineChartComponent,
    DiagramCommentsComponent,
    DiagramFlatsComponent,
    DiagramUsersComponent,
    UsersLineChartComponent,
    UserChartComponent,
    FlatChartComponent,
    ActiveCountComponent,
    ProfileShortComponent,
    ChatButtonComponent,
    ComentsaboutcommentComponent,
    ListCommentComponent,
    ReviewWindowComponent,
    FlatRequestDetailComponent,
    UserRequestDetailComponent,
    AddFlatComponent,
    UserCommentsAboutComentComponent,
    UserListCommentsAboutComentComponent,
    LikeComponent,
    AutoApproveComponent,
    RequestMessageComponent,
    LandlordFlatListComponent,
    ComplaintComponent,
    ComplaintUCComponent,
    FavoriteFlatComponent,
    FlatMapComponent,
    ChangePasswordComponent,
    FlatRequestsComponent,
    FlatRequestReviewComponent,
    ReviewAreaComponent,
    BookingRequestsComponent
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
    GalleryModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatBadgeModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
      }],
    RegistrationService, AuthService, FlatService, FlatBookingService, AuthGuard, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
