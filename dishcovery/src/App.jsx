import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Loader from './components/Loader';
import RecipeDetail from './components/RecipeDetail';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // filtered results
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        const meals = data.meals || [];
        setItems(meals);
        setFilteredItems(meals); // show all initially
        setLoading(false);
      }).catch(err => {
        console.log('API fetch error');
        setLoading(false);
      });
  }, []);

  // Search handler passed to SearchBar
  const handleSearch = (query) => {
    if (!query.trim()) {
      // if empty search, show all items
      setFilteredItems(items);
    } else {
      // filter by meal name, case insensitive
      const filtered = items.filter(item =>
        item.strMeal.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <Link to='/'>
        <div className="flex flex-col items-center mb-8 relative">
          <img src="/dishcovery.png" alt="Dishcovery Logo" className="w-24 mb-4" />
          <h1 className="font-bold text-4xl text-textColor absolute mt-4">Dishcovery</h1>
        </div>
      </Link>

      <Routes>
        <Route path="/" element={
          loading ? (
            <Loader loadImg='/recipe.gif' />
          ) : (
            <>
              <SearchBar handleSearch={handleSearch} />
              {filteredItems && filteredItems.length > 0 ? (
                <RecipeList items={filteredItems} />
              ) : (
                <p className="text-center text-gray-500">No recipes found 🍽️</p>
              )}
            </>
          )
        } />

        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}
