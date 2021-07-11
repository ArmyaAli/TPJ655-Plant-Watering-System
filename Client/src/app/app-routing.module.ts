import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
