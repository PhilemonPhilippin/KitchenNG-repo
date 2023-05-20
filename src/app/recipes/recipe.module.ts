import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeCategoryDetailComponent } from './recipe-category-detail.component';
import { IngredientDetailComponent } from './ingredient-detail.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCategoryDetailComponent,
    IngredientDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:id', component: RecipeDetailComponent },
      {
        path: 'recipecategories/:id',
        component: RecipeCategoryDetailComponent,
      },
      { path: 'ingredients/:id', component: IngredientDetailComponent },
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
