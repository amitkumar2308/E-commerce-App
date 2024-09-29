import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setSelectedCategory, fetchProducts } from '../redux/productSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch all categories on component mount
  }, [dispatch]);

  // Fetch products whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProducts({ category: selectedCategory.name })); // Fetch products by selected category
    } else {
      dispatch(fetchProducts({})); // If no category is selected, fetch all products
    }
  }, [selectedCategory, dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category ? { name: category.name } : null)); // Update selected category
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Categories</h2>
      <button
        className={`block w-full text-left px-4 py-2 rounded-lg transition duration-300 ease-in-out ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        onClick={() => handleCategoryChange(null)} // Reset selection for 'All'
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.slug} // Using slug as a unique key
          className={`block w-full text-left px-4 py-2 rounded-lg transition duration-300 ease-in-out ${selectedCategory?.name === category.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => handleCategoryChange(category)} // Pass the entire category object
        >
          {category.name} {/* Render the name property */}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
