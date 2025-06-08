import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' 
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Add this for CORS
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Removed this to allow users have acces to dashboad while not logged in.
//Remember to fix it, by implementing the 10 trail messages by users not registered.

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove('token');
//       window.location.href = '/signin';
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message
        });
        
        return Promise.reject(error);
    }
);

// Send Email API calls
export const email = {
  sendEmail: async (formData) => {
    try {
      const response = await api.post('/main/sendEmail', formData);
      return response.data;
    } catch (error) {
      // Enhance error handling
      const errorMessage = error.response?.data?.message || 'Failed to send email';
      throw new Error(errorMessage);
    }
  }
};

// Auth API calls
export const auth = {
  signin: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },
  
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  forgotPassword: async (email) => {
        const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
        return response.data;
  },

  resetPassword: async (token, password) => {
        const response = await axios.post(`${BASE_URL}/auth/reset-password/${token}`, { password });
        return response.data;
  }
};

// Chat API calls
export const chat = {
  sendMessage: async (message) => {
    const response = await api.post('/main/chat', { message });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/main/chat-history');
    return response.data;
  },

  deleteMessage: async (messageId) => {
    const response = await api.delete(`/main/delete-history/${messageId}`);
    return response.data;
  },
};

// Image API calls
export const image = {
  uploadImage: async (formData) => {
    const response = await api.post('/main/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};


export const analyze = {
    analyzeText: async (text) => {
        try {
            const response = await api.post('/main/analyze', { text });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to analyze text');
        }
    },
    getHistory: async () => {
        try {
            const response = await api.get('/main/analysis-history');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch analysis history');
        }
    },
    deleteAnalysis: async (analysisId) => {
        try {
            const response = await api.delete(`/main/delete-analysis/${analysisId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to delete analysis');
        }
    }
};

export const studyGuide = {
    generateGuide: async (topic) => {
        try {
            const response = await api.post('/main/generate', { topic });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to generate study guide');
        }
    },
    getHistory: async () => {
        try {
            const response = await api.get('/main/study-guide-history');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch study guide history');
        }
    },
    deleteGuide: async (guideId) => {
        try {
            const response = await api.delete(`/main/delete-guide/${guideId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to delete study guide');
        }
    }
};

export default api;