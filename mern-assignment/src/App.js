import React from 'react';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl font-bold p-4'>E-commerce App</h1>
      {/* Search Bar */}
      <SearchBar />
      
      {/* Main Content */}
      <div className="flex mt-4">
        {/* Category Filter (Left Sidebar) */}
        <div className="w-1/4">
          <CategoryFilter />
        </div>

        {/* Product List */}
        <div className="w-3/4 ml-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default App;
