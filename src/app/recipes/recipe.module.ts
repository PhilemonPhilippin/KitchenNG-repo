import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
  declarations: [RecipeListComponent, RecipeDetailComponent],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:id', component: RecipeDetailComponent },
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
