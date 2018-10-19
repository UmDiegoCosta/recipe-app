import React, { Component } from 'react';
import axios from 'axios';

import classes from './Recipes.module.css';
import Recipe from '../../components/Recipe/Recipe';

class Recipes extends Component {
  state = {
    allRecipes: [],
    selectedRecipes: [],
    error: false
  }

  componentWillMount() {
    axios
      .get('https://raw.githubusercontent.com/UmDiegoCosta/paybyphone-test/master/src/json/recipes.json')
      .then(response => {
        const updatedRecipes = response.data;
        updatedRecipes.map((obj) => {
          obj.checked = false;
          return obj;
        });
        this.setState({ allRecipes: updatedRecipes })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getSelectedIngredientsHandle = (recName, isChecked) => {
    const allRecipes = this.state.allRecipes;
    const oldSelectedRecipes = this.state.selectedRecipes;
    const recipeChecked = recName;

    allRecipes.forEach((recipe, index) => {
      if (recipeChecked === recipe.name) {
        if (!isChecked) {
          allRecipes[index].checked = true;
          const selectedRecipes = {
            id: recipe.name,
            ingredients: [...recipe.ingredients]
          };
          const newSelectedRecipes = [...oldSelectedRecipes, selectedRecipes];
          this.setState({ selectedRecipes: newSelectedRecipes });
        } else {
          allRecipes[index].checked = false;
          const newSelectedRecipes = oldSelectedRecipes.filter(rec => rec.id !== recipeChecked);
          this.setState({ selectedRecipes: newSelectedRecipes });
        }
      }
    })
  }

  renderAllRecipes = (recipe) => {
    return (
      <Recipe
        key={recipe.name}
        clicked={() => this.getSelectedIngredientsHandle(recipe.name, recipe.checked)}
        name={recipe.name}
        type={recipe.type}
        time={recipe.cook_time}
        isChecked={recipe.checked}
      />
    );
  }

  renderDistinctIngredients = () => {
    const selectedRecipes = this.state.selectedRecipes;
    let selectedIngredients = [];

    selectedRecipes.forEach(recipe => {
      selectedIngredients.push(recipe.ingredients);
    });

    const flattenedArray = [].concat(...selectedIngredients);
    const uniqueIngredients = [...new Set(flattenedArray)].sort();
    return (
      <div className={classes.IngredientList}>
        <h4>Ingredients List</h4>
        <ul className={classes.Ingredients}>
          {uniqueIngredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className={classes.Recipes}>
        <div>
          <h4>Select Recipes</h4>
          <table className={classes.RecipesTable}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Cook Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allRecipes.map(this.renderAllRecipes)}
            </tbody>
          </table>
        </div>

        {this.renderDistinctIngredients()}
      </div>
    );
  };
};

export default Recipes;