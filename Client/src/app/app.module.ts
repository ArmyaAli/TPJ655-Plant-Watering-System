import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ContactPageComponent } from './Pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { globalStateService } from './State/global';
import { DeviceStatusComponent } from './Components/device-status/device-status-component.component';
import { AccountInfoComponent } from './Components/account-info/account-info.component';
import { SchedulingContentComponent, updateScheduleDialogComponent } from './Components/scheduling-content/scheduling-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ContactPageComponent,
    PageNotFoundComponent,
    PageNotFoundComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    DeviceStatusComponent,
    AccountInfoComponent,
    SchedulingContentComponent,
    updateScheduleDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [globalStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
