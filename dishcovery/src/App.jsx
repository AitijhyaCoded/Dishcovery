import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Loader from './components/Loader';
import RecipeDetail from './components/RecipeDetail';
import { Routes, Route, Link } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        const meals = data.meals || [];
        setItems(meals);
        setFilteredItems(meals); 
        setLoading(false);
      }).catch(err => {
        console.log('API fetch error');
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredItems(items);
    } else {
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
                <ErrorMessage />
              )}
            </>
          )
        } />

        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}
