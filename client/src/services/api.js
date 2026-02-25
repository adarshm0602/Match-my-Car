/**
 * API Service Layer
 * 
 * This file contains all functions to communicate with the backend API.
 * It uses axios to make HTTP requests to the Express backend.
 */

import axios from 'axios';

// Base URL for the API
// In development, use relative URLs so Vite proxy handles routing to localhost:3000
// In production, use the VITE_API_URL environment variable
const API_ROOT = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = `${API_ROOT}/api/cars`;
const AI_BASE_URL = `${API_ROOT}/api/ai`;

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
export const getCars = async (filters = {}, signal) => {
  try {
    const queryString = buildQueryString(filters);
    const response = await axios.get(`${API_BASE_URL}${queryString}`, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error) || error.name === 'AbortError' || error.name === 'CanceledError') {
      throw error; // Let caller handle abort silently
    }
    throw error;
  }
};

/**
 * Get a single car by ID
 * @param {string} id - Car ID
 * @returns {Promise} Promise that resolves to car data
 */
export const getCarById = async (id, signal) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error) || error.name === 'AbortError' || error.name === 'CanceledError') {
      throw error;
    }
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
    throw error;
  }
};

/**
 * Get AI-powered car recommendations
 * @param {Object} preferences - { budget, familySize, priorities, usage, fuelPreference }
 */
export const getAIRecommendations = async (preferences) => {
  const response = await axios.post(`${AI_BASE_URL}/recommend`, preferences);
  return response.data;
};

/**
 * Get AI-powered car comparison
 * @param {string[]} carIds - Array of 2-3 car IDs to compare
 */
export const getAIComparison = async (carIds) => {
  const response = await axios.post(`${AI_BASE_URL}/compare`, { carIds });
  return response.data;
};

// ---- Admin CRUD (requires API key) ----

export const createCar = async (carData, apiKey) => {
  const response = await axios.post(API_BASE_URL, carData, {
    headers: { 'x-api-key': apiKey },
  });
  return response.data;
};

export const updateCar = async (id, carData, apiKey) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, carData, {
    headers: { 'x-api-key': apiKey },
  });
  return response.data;
};

export const deleteCar = async (id, apiKey) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { 'x-api-key': apiKey },
  });
  return response.data;
};
