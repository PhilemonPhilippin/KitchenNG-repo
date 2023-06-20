import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeCategoryDetailComponent } from './recipe-categories/recipe-category-detail.component';
import { IngredientDetailComponent } from './ingredients/ingredient-detail.component';
import { PreparationStepDetailComponent } from './preparation-steps/preparation-step-detail.component';
import { RecipeCategoryEditComponent } from './recipe-categories/recipe-category-edit.component';
import { IngredientEditComponent } from './ingredients/ingredient-edit.component';
import { PreparationStepEditComponent } from './preparation-steps/preparation-step-edit.component';
import { RecipeCategoryComponent } from './recipe-categories/recipe-category.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCategoryComponent,
    RecipeCategoryDetailComponent,
    RecipeCategoryEditComponent,
    IngredientDetailComponent,
    IngredientEditComponent,
    PreparationStepDetailComponent,
    PreparationStepEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:id', component: RecipeDetailComponent },
      {
        path: 'recipecategories/:id',
        component: RecipeCategoryComponent,
      },
      { path: 'ingredients/:id', component: IngredientDetailComponent },
      {
        path: 'recipes/:recipeid/preparationsteps/:id',
        component: PreparationStepDetailComponent,
      },
      {
        path: 'recipes/:recipeid/preparationsteps/:id/edit',
        component: PreparationStepEditComponent,
      },
      {
        path: 'ingredients/:id/edit',
        component: IngredientEditComponent,
      },
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
