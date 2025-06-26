import React from 'react'
import { Link } from 'react-router-dom';

const RecipeCard = ({item}) => {

  return (
        <div key={item.idMeal} className="bg-transparent rounded-lg overflow-hidden shadow-md border border-textColor p-2">
              <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-48 object-cover rounded-lg" />
              <div className="p-4 flex items-center justify-between space-x-12">
                <div className="flex-grow max-w-[70%]">
                    <h2 className="font-semibold text-lg mb-0 truncate">{item.strMeal}</h2>
                </div>
                <Link to={`/recipe/${item.idMeal}`}>
                <button className="bg-redTheme hover:bg-red-800 text-white px-4 py-1 rounded-full whitespace-nowrap">
                    View Recipe
                </button>
                </Link>
              </div>
            </div>
  )
}

export default RecipeCard
