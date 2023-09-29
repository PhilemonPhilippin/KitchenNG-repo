import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { RecipeModule } from './recipes/recipe.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './home/auth-button.component';
import { UserProfileComponent } from './home/user-profile.component';
import { UserMetadataComponent } from './home/user-metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AuthButtonComponent,
    UserProfileComponent,
    UserMetadataComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    RecipeModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'dev-41p64qnh24oyo2su.us.auth0.com',
      clientId: 'Jdyh4yDbzoBPZpJnBWhZnzm43Un7XwLr',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200',
        audience: 'https://localhost:7049/api/',
        scope: 'read:messages',
      },
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'api/v2' (note the asterisk)
            uri: 'https://localhost:7049/api/Messages/private',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://localhost:7049/api/',

                // The attached token should have these scopes
                scope: 'read:messages',
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
