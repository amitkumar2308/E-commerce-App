import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, incrementPage, decrementPage } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);
  const currentPage = useSelector((state) => state.product.currentPage);
  const totalProducts = useSelector((state) => state.product.totalProducts);
  const limit = 10; // Number of products per page

  // Fetch products based on the selected category and current page
  useEffect(() => {
    const skip = currentPage * limit;
    dispatch(fetchProducts({ limit, skip, category: selectedCategory }));
  }, [selectedCategory, currentPage, dispatch]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {selectedCategory && selectedCategory.name
          ? `${selectedCategory.name}`
          : 'All Products'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-2 flex-grow">{product.title}</h3>
              <p className="text-gray-700 mt-1">Price: ${product.price}</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => dispatch(decrementPage())}
          disabled={currentPage === 0}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          Page {currentPage + 1} of {totalPages}
        </div>
        <button
          onClick={() => dispatch(incrementPage())}
          disabled={currentPage >= totalPages - 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
