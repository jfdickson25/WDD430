import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Hamburger', 'A great meal for a big boy', 
    'https://recipes-secure-graphics.grocerywebsite.com/0_GraphicsRecipes/4589_4k.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Beef', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Turkey', 'Turkey for dinner', 
    'https://www.cookingclassy.com/wp-content/uploads/2019/05/turkey-burger-12.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Turkey', 1),
      new Ingredient('French Fries', 10)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice(); 
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
