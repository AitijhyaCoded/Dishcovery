import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Loader from './components/Loader';
import RecipeDetail from './components/RecipeDetail';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
        <motion.div
          className="flex flex-col items-center mb-8 relative"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.4 } }
          }}
        >
          <motion.img
            src="/dishcovery.png"
            alt="Dishcovery Logo"
            className="w-24 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <motion.h1
            className="font-bold text-4xl text-textColor absolute mt-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          >
            Dishcovery
          </motion.h1>
        </motion.div>
      </Link>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {loading ? (
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
              )}
            </motion.div>
          } />

          <Route path="/recipe/:id" element={
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <RecipeDetail />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
