import { NgModule } from '@angular/core';
import { RecipeListComponent } from './pages/recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RecipeDetailComponent } from './subcomponents/recipe-detail.component';
import { RecipeCategoryDetailComponent } from '../recipe-categories/subcomponents/recipe-category-detail.component';
import { IngredientDetailComponent } from '../ingredients/subcomponents/ingredient-detail.component';
import { PreparationStepDetailComponent } from '../preparation-steps/subcomponents/preparation-step-detail.component';
import { RecipeCategoryEditComponent } from '../recipe-categories/subcomponents/recipe-category-edit.component';
import { IngredientEditComponent } from '../ingredients/subcomponents/ingredient-edit.component';
import { PreparationStepEditComponent } from '../preparation-steps/subcomponents/preparation-step-edit.component';
import { RecipeCategoryComponent } from '../recipe-categories/pages/recipe-category.component';
import { IngredientComponent } from '../ingredients/pages/ingredient.component';
import { PreparationStepComponent } from '../preparation-steps/pages/preparation-step.component';
import { RecipeComponent } from './pages/recipe.component';
import { RecipeIngredientListComponent } from '../recipe-ingredients/pages/recipe-ingredient-list.component';
import { RecipePreparationStepListComponent } from '../preparation-steps/subcomponents/recipe-preparation-step-list.component';
import { RecipeEditComponent } from './subcomponents/recipe-edit.component';
import { RecipeIngredientAddComponent } from '../recipe-ingredients/subcomponents/recipe-ingredient-add.component';
import { PreparationStepAddComponent } from '../preparation-steps/subcomponents/preparation-step-add.component';
import { RecipeIngredientEditComponent } from '../recipe-ingredients/subcomponents/recipe-ingredient-edit.component';
import { IngredientListComponent } from '../ingredients/pages/ingredient-list.component';
import { RecipeCategoryListComponent } from '../recipe-categories/pages/recipe-category-list.component';
import { IngredientAddComponent } from '../ingredients/subcomponents/ingredient-add.component';
import { RecipeCategoryAddComponent } from '../recipe-categories/subcomponents/recipe-category-add.component';
import { RecipeAddComponent } from './subcomponents/recipe-add.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeIngredientListComponent,
    RecipeIngredientAddComponent,
    RecipeIngredientEditComponent,
    RecipePreparationStepListComponent,
    RecipeCategoryListComponent,
    RecipeCategoryComponent,
    RecipeCategoryDetailComponent,
    RecipeCategoryEditComponent,
    RecipeCategoryAddComponent,
    IngredientListComponent,
    IngredientComponent,
    IngredientDetailComponent,
    IngredientAddComponent,
    IngredientEditComponent,
    PreparationStepComponent,
    PreparationStepDetailComponent,
    PreparationStepEditComponent,
    PreparationStepAddComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:id', component: RecipeComponent },
      { path: 'recipecategories', component: RecipeCategoryListComponent },
      {
        path: 'recipecategories/:id',
        component: RecipeCategoryComponent,
      },
      { path: 'ingredients/:id', component: IngredientComponent },
      { path: 'ingredients', component: IngredientListComponent },
      {
        path: 'recipes/:recipeid/preparationsteps/:id',
        component: PreparationStepComponent,
      },
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
