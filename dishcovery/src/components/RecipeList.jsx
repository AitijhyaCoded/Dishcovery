import React from 'react'
import RecipeCard from './RecipeCard'

const RecipeList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items && items.map((item) => (
            <RecipeCard item = {item} />
          ))}
        </div>
  )
}

export default RecipeList
