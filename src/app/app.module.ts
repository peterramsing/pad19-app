import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ConferenceComponent } from './conference/conference.component';
import { ConferenceDetailComponent } from './conference-detail/conference-detail.component';

const appRoutes: Routes = [
  { path: 'conference', component: ConferenceComponent, canActivate: [AuthGuard] },
  { path: 'conference/:id', component: ConferenceDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    ConferenceComponent,
    ConferenceDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
    ),
    CoreModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
