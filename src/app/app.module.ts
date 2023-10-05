import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { RecipeModule } from './recipes/recipe.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthModule, HttpMethod } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    SharedModule,
    RecipeModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'philauth.eu.auth0.com',
      clientId: 'qmxF86tOyMzFhZMzrfD5B0P0F6EkqXCk',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://localhost:7049/api',
        //scope: '',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://localhost:7049/api/ingredients/*',
            httpMethod: HttpMethod.Get,
            tokenOptions: {
              authorizationParams: {
                audience: 'https://localhost:7049/api',
                //scope: '',
              },
            },
          },
        ],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
