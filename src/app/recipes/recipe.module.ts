import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
