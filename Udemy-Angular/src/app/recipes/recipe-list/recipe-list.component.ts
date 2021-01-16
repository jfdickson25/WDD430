import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Hamburger', 'A great meal for a big boy', 
    'https://recipes-secure-graphics.grocerywebsite.com/0_GraphicsRecipes/4589_4k.jpg'),
    new Recipe('Hamburger', 'A great meal for a big boy', 
    'https://recipes-secure-graphics.grocerywebsite.com/0_GraphicsRecipes/4589_4k.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
