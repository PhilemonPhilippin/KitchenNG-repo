KitchenNG
============

## Table of contents

| Section | Title |
|--- | ---|
| 2 | [The aim of this project](./README.md#the-aim-of-this-project) |
| 3 | [The design](./README.md#the-design) |
| 4 | [Link to the API part of the project](./README.md#link-to-the-api-part-of-the-project) |

## The aim of this project

Kitchen is a web application designed to manage recipes. I wrote this program myself in my spare time.
I mainly worked on it for about 3 months when I was also looking for a job in April 2023.

## The design

I've created a user interface using the bootstrap framework, which gives a clear, efficient and responsive, if slightly generic, look.

### "The design" table

| Section | Title |
|--- | ---|
| 2 | [Recipe list](./README.md#recipe-list) |
| 3 | [Recipe details](./README.md#recipe-details) |
| 4 | [Category, ingredient and preparation step details](./README.md#category-ingredient-and-preparation-step-details) |
| 5 | [Category list](./README.md#category-list) |
| 6 | [Ingredient list](./README.md#ingredient-list) |

### Recipe list

The central page is the recipe list. It includes several components such as the search bar used to filter searches, a button to add a recipe, pagination and finally the recipe list.

#### The list

![Recipe list](./images/recipe_list.png "Recipe list")

#### The pagination

Pagination allows you to choose the number of recipes displayed, as well as the page number required.

![Pagination](./images/pagination.png "Pagination")

#### Add recipe

The "Add" button displays a component enabling us to add a recipe to the list.

![Add recipe](./images/add_recipe.png "Add recipe")

### Recipe details

When you select a recipe from the list, you are taken to a page containing details of that recipe. Here are two screenshots showing this page.

#### Recipe details and ingredients

The first part of the page presents the details of the recipe, as well as the ingredients it contains.

![Recipe details 1](./images/recipe_details-1.png "Recipe details 1")

#### Recipe details and preparation steps

The second part of the page presents the preparation steps of the recipe.

![Recipe details 2](./images/recipe_details-2.png "Recipe details 2")

#### Recipe edit

A component is displayed when the Edit button is clicked to modify the recipe in question.

![Recipe edit](./images/recipe_edit.png "Recipe edit")

#### Edit recipe ingredients

A little further down, in the recipe's ingredient list, we can change the quantity of the ingredient concerned by clicking on the yellow button. The "Add" button is used to add an ingredient to the recipe.

At the very bottom of the page, the "Add" button lets you add preparation steps to the recipe. Each item on this page is selectable. You can click on the recipe category, on an ingredient or on a recipe preparation step.

![Edit recipe ingredient](./images/edit_recipe_ingredient.png "Edit recipe ingredient")

### Category, ingredient and preparation step details

Selecting the recipe category takes us to the category details page. The design of this page is reused for the ingredient details and preparation step details pages.  
These three pages allow us to consult detailed information on the entity in question, and also to modify or delete it completely.

#### Category details

![Category details](./images/category_details.png "Category details")

#### Ingredient details

![Ingredient details](./images/ingredient_details.png "Ingredient details")

#### Preparation step details

![Preparation step details](./images/preparation_step_details.png "Preparation step details")

### Category list

The navigation bar takes us to the page displaying the list of categories.

![Category list](./images/category_list.png "Category list")

### Ingredient list

The navigation bar also takes us to the page displaying the list of ingredients. Here, too, we find the pagination component, allowing us to select the number of ingredients to be displayed and the number of the desired page.

![Ingredient list](./images/ingredient_list.png "Ingredient list")

## Link to the API part of the project

To see more details about the purpose of this project, the circumstances in which it was built and the technology used to make the server part, you can consult the API to which this project is linked at : [Kitchen-repo](https://github.com/PhilemonPhilippin/Kitchen-repo)
