/**
 * API Service Layer
 * 
 * This file contains all functions to communicate with the backend API.
 * It uses axios to make HTTP requests to the Express backend.
 */

import axios from 'axios';

// Base URL for the API - points to our Express backend
// Use environment variable in production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/cars`
  : 'http://localhost:3000/api/cars';

/**
 * Build query string from filter object
 * Converts { brand: 'Toyota', minPrice: 1000000 } to '?brand=Toyota&minPrice=1000000'
 */
const buildQueryString = (filters) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    // Only add non-empty values to query string
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        // Handle arrays (like bodyType: ['SUV', 'Sedan'])
        value.forEach((item) => params.append(key, item));
      } else {
        params.append(key, value);
      }
    }
  });
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Get all cars with optional filters
 * @param {Object} filters - Filter object with properties like brand, bodyType, minPrice, etc.
 * @returns {Promise} Promise that resolves to cars data
 */
export const getCars = async (filters = {}) => {
  try {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`${API_BASE_URL}${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

/**
 * Get a single car by ID
 * @param {string} id - Car ID
 * @returns {Promise} Promise that resolves to car data
 */
export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

/**
 * Get all unique brands from the database
 * @returns {Promise} Promise that resolves to array of brand names
 */
export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filters/brands`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

/**
 * Get all unique body types from the database
 * @returns {Promise} Promise that resolves to array of body types
 */
export const getBodyTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filters/body-types`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching body types:', error);
    throw error;
  }
};

/**
 * Get price range (min and max) from all car variants
 * @returns {Promise} Promise that resolves to { minPrice, maxPrice }
 */
export const getPriceRange = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filters/price-range`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching price range:', error);
    throw error;
  }
};

/**
 * Get database statistics
 * @returns {Promise} Promise that resolves to stats object
 */
export const getCarStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats/overview`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
