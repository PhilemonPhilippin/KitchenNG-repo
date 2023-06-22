import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeCategoryDetailComponent } from '../recipe-categories/recipe-category-detail.component';
import { IngredientDetailComponent } from '../ingredients/ingredient-detail.component';
import { PreparationStepDetailComponent } from '../preparation-steps/preparation-step-detail.component';
import { RecipeCategoryEditComponent } from '../recipe-categories/recipe-category-edit.component';
import { IngredientEditComponent } from '../ingredients/ingredient-edit.component';
import { PreparationStepEditComponent } from '../preparation-steps/preparation-step-edit.component';
import { RecipeCategoryComponent } from '../recipe-categories/recipe-category.component';
import { IngredientComponent } from '../ingredients/ingredient.component';
import { PreparationStepComponent } from '../preparation-steps/preparation-step.component';
import { RecipeComponent } from './recipe.component';
import { RecipeIngredientListComponent } from '../recipe-ingredients/recipe-ingredient-list.component';
import { RecipePreparationStepListComponent } from '../preparation-steps/recipe-preparation-step-list.component';
import { RecipeEditComponent } from './recipe-edit.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeIngredientListComponent,
    RecipePreparationStepListComponent,
    RecipeCategoryComponent,
    RecipeCategoryDetailComponent,
    RecipeCategoryEditComponent,
    IngredientComponent,
    IngredientDetailComponent,
    IngredientEditComponent,
    PreparationStepComponent,
    PreparationStepDetailComponent,
    PreparationStepEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:id', component: RecipeComponent },
      {
        path: 'recipecategories/:id',
        component: RecipeCategoryComponent,
      },
      { path: 'ingredients/:id', component: IngredientComponent },
      {
        path: 'recipes/:recipeid/preparationsteps/:id',
        component: PreparationStepComponent,
      }
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
