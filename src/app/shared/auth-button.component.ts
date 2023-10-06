import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <a
        (click)="
          auth.logout({ logoutParams: { returnTo: 'http://localhost:4200' } })
        "
        class="nav-link px-3 cursor-pointer"
      >
        Log out
      </a>
    </ng-container>

    <ng-template #loggedOut>
      <a
        (click)="auth.loginWithRedirect()"
        class="nav-link px-3 cursor-pointer"
      >
        Log in
      </a>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}
}
