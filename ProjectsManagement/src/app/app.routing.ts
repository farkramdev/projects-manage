import { ManageProjectsComponent } from './components/manage-projects/manage-projects.component';
import { ManageExaminationComponent } from './components/manage-examination/manage-examination.component';
import { StudentsComponent } from './components/students/students.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { UrlConfig } from './config/url.config';
import { Routes, RouterModule } from '@angular/router';
const Url = UrlConfig;
const routes: Routes = [
	{ path: Url.Home, component: HomeComponent },
	{ path: Url.Department, component: DepartmentsComponent },
	{ path: Url.Subject, component: SubjectsComponent },
	{ path: Url.Advisor, component: AdvisorComponent },
	{ path: Url.Student, component: StudentsComponent },
	{ path: Url.ProjectManages, component: ManageProjectsComponent },
	{ path: Url.ManageExam, component: ManageExaminationComponent },
	// { path: Url.Home, component: AppComponent },
	// { path: Url.Signup, component: SignupComponent, canActivate: [RequireSignin] },
	// { path: Url.Sellwithout, component: SellwithoutComponent },
	// { path: Url.SellOrSign, component: SellOrSigninComponent },


	// //payoot
	// /* start path component*/
	// { path: Url.Signin, component: SigninComponent, canActivate: [RequireSignin] },
	// { path: Url.ForgotPass, component: ForgotPassComponent, canActivate: [RequireSignin] },
	// { path: Url.ResetPass + '/:token', component: ResetpassComponent },
	// { path: Url.Confirm, component: ComfirmOpComponent },
	// { path: Url.TimeOut, component: TimeoutComponent, canActivate: [RequireSignin] },
	// { path: Url.Buywithout, component: BuywithoutComponent },
	// /* end component*/

	// { path: Url.AccountInfo, component: AccountsComponent, canActivate: [RequireAuth] },
	// { path: Url.Buy, component: BuyComponent, canActivate: [RequireAuth] },
	// { path: Url.Sale, component: SaleComponent, canActivate: [RequireAuth] },
	// { path: Url.Send, component: SendComponent, canActivate: [RequireAuth] },
	// { path: Url.Dashboard, component: DashboardComponent, canActivate: [RequireAuth] },
	// { path: Url.Receive, component: ReceiveComponent, canActivate: [RequireAuth] },
	{ path: '**', redirectTo: Url.Home, pathMatch: 'full' }
];
export const RoutingModule = RouterModule.forRoot(routes);