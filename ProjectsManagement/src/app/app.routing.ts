import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
	// { path: Url.Home, component: HomeComponent },
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
	// { path: '*', component: SigninComponent, pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);