import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BandDetailComponent } from './band-detail/band-detail.component';

import { StringManipService } from './services/string-manip.service';
import { AsyncCacherService } from './services/async-cacher.service';
import { AsyncDataStoreComponent } from './async-data-store/async-data-store.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BandDetailComponent,
    AsyncDataStoreComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ss-ang4'}),
    SharedModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    StringManipService,
    AsyncCacherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
