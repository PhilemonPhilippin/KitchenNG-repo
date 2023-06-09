import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeCategoryDetailComponent } from './recipe-category-detail.component';
import { IngredientDetailComponent } from './ingredient-detail.component';
import { PreparationStepDetailComponent } from './preparation-step-detail.component';
import { RecipeCategoryEditComponent } from './recipe-category-edit.component';
import { IngredientEditComponent } from './ingredient-edit.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCategoryDetailComponent,
    RecipeCategoryEditComponent,
    IngredientDetailComponent,
    IngredientEditComponent,
    PreparationStepDetailComponent,
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
      {
        path: 'recipes/:recipeid/preparationsteps/:id',
        component: PreparationStepDetailComponent,
      },{
        path: 'recipecategories/:id/edit', component: RecipeCategoryEditComponent
      }, {
        path: 'ingredients/:id/edit', component: IngredientEditComponent
      }
    ]),
    SharedModule,
  ],
})
export class RecipeModule {}
