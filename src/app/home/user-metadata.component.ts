import { Component } from '@angular/core';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';
import { concatMap } from 'rxjs/internal/operators/concatMap';

@Component({
  selector: 'app-metadata',
  template: ` <button (click)="clickMe()">Click me!</button>
    <div *ngIf="itWorked">
      <p>It worked!</p>
      <p>{{ responseObject }}</p>
    </div>`,
  styles: [],
})
export class UserMetadataComponent {
  itWorked: boolean = false;
  // message: string = '';
  responseObject: Object = {};
  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  clickMe(): void {
    // this.auth.user$
    //   .pipe(
    //     concatMap((user) =>
    //       this.http.get<Object>(
    //         encodeURI(`https://localhost:7049/api/Messages/private`),
    //         {
    //           observe: 'response',
    //           headers: {
    //             authorization:
    //               'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9VNEducXNTUXpFdjNSTmlDd0NqNSJ9.eyJpc3MiOiJodHRwczovL3BoaWxlbW9ucGhpbGlwcGluLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJSSDhwWTF1VkZmMnlqM014OGxNdUJ6T3NOTGEzb2xFeUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA0OS9hcGkiLCJpYXQiOjE2OTU3OTAyODMsImV4cCI6MTY5NTg3NjY4MywiYXpwIjoiUkg4cFkxdVZGZjJ5ajNNeDhsTXVCek9zTkxhM29sRXkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.M-6LMCnOOljFGeGUClqbS8PJZ-Hrdmf2SeZ8jZseSNd3n9Wk_Zx5HHp_GCOCiXzZo15gjJov6uG55RrJghFCx8_GnchuAwVg8ssG_AuvwaB9YsWlgqBxuQtH3gMUrfRgkWUolfTVCjMxICd-qjomhPDpLcwDpcT5zaj5y3JO07apam1LpHTOMtnRY0LmmJJ_eMIY-GN9eRHXuwDi6II9y9UdlBtBZV3ee-hmUstGO9LkDAQnZ0WtO-RWSvWjHy03-aiY0uLBIMYkCgK8pMuLoSDhxhiXd8iIzkSG-Ha7ofRAp537Seei3nW3zkm8Dw4zyG5QOYWlOBWLCcg-nH5ujA',
    //           },
    //         }
    //       )
    //     )
    //   )
    this.http
      .get<Object>(encodeURI(`https://localhost:7049/api/Messages/private`), {
        observe: 'response',
        headers: {
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9VNEducXNTUXpFdjNSTmlDd0NqNSJ9.eyJpc3MiOiJodHRwczovL3BoaWxlbW9ucGhpbGlwcGluLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTExMWJmZmU3NWE5NjQxM2NlYTM5YzIiLCJhdWQiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA0OS9hcGkiLCJodHRwczovL3BoaWxlbW9ucGhpbGlwcGluLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTU4MjYwODAsImV4cCI6MTY5NTkxMjQ4MCwiYXpwIjoiNTdSNE5SRlROclJQcjJ0QzBqeXhZTGcwNjVxcTZ4R20iLCJzY29wZSI6Im9wZW5pZCByZWFkOm1lc3NhZ2VzIiwicGVybWlzc2lvbnMiOlsicmVhZDptZXNzYWdlcyJdfQ.cbDldHhMnUZ8pbhD4kunuakTPZg-EBpZfBoDhSv6wepTwmfTt693uwNoIhsbcebpimJr2akntOUYtjZTcsOSVYJnuoCsEPSxGcCK5u0bL_VopG-1l6Ar0-N6ILyw4zV_m5TjwGkZ7oQMy74bkpk0g45t7N3_MzmCSE55mAQNde9ir0K_NkDUFzEFtK_oal2C50nT1S97gqjd-V3GjLraes6rSb9tiKRxKrxHvW0vIKg-8dZ8B561MCG5co4ftX20Sx-Q3xXmmJXPg6BOSQRCUvhNWTtu1N_T0Fm9mvUqkImiYHzIkw9KlrttD8aBaq-Nhv-0MrG7v_cQ8w8pRz6q5g',
        },
      })
      .subscribe({
        next: (response) => {
          this.responseObject = response;
          this.itWorked = true;
        },
      });
  }
}
