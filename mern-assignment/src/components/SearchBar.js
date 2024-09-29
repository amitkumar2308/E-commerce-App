import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchProducts } from '../redux/productSlice';
import { FaSearch } from 'react-icons/fa'; // Import an icon for the search bar

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));

    // Fetch products with the updated search query and selected category
    dispatch(fetchProducts({ search: query, category: selectedCategory }));
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="w-full p-3 pl-10 pr-4 border rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
