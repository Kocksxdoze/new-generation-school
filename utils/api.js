import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://new-generation-school.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Включаем передачу куки (для авторизации)
});

// Прикрепляем Bearer токен из localStorage, если он есть (гарантия авторизации при кросс-доменных запросах)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ngs_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth ---
export const authService = {
  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { login: username, password });
    if (data?.data?.token && typeof window !== 'undefined') {
      localStorage.setItem('ngs_token', data.data.token);
    }
    return data;
  },
  logout: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ngs_token');
    }
    const { data } = await api.post('/auth/logout');
    return data;
  },
  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// --- News ---
export const newsService = {
  // Public
  getPublishedNews: async () => {
    const { data } = await api.get('/news');
    return data; // Предполагается { success: true, data: [...] }
  },
  getNewsBySlug: async (slug) => {
    const { data } = await api.get(`/news/${slug}`);
    return data;
  },
  // Admin
  getAllNews: async () => {
    const { data } = await api.get('/admin/news');
    return data;
  },
  createNews: async (newsData) => {
    const { data } = await api.post('/admin/news', newsData);
    return data;
  },
  updateNews: async (id, newsData) => {
    const { data } = await api.put(`/admin/news/${id}`, newsData);
    return data;
  },
  deleteNews: async (id) => {
    const { data } = await api.delete(`/admin/news/${id}`);
    return data;
  }
};

// --- Pages ---
export const pagesService = {
  // Public
  getPageBySlug: async (slug) => {
    const { data } = await api.get(`/site/${slug}`);
    return data;
  },
  // Admin
  getAllPages: async () => {
    const { data } = await api.get('/admin/pages');
    return data;
  },
  createPage: async (pageData) => {
    const { data } = await api.post('/admin/pages', pageData);
    return data;
  },
  updatePage: async (id, pageData) => {
    const { data } = await api.put(`/admin/pages/${id}`, pageData);
    return data;
  },
  deletePage: async (id) => {
    const { data } = await api.delete(`/admin/pages/${id}`);
    return data;
  },
  
  // Section management within a page
  createSection: async (pageId, sectionData) => {
    const { data } = await api.post(`/admin/pages/${pageId}/sections`, sectionData);
    return data;
  },
  updateSection: async (pageId, sectionId, sectionData) => {
    const { data } = await api.put(`/admin/pages/${pageId}/sections/${sectionId}`, sectionData);
    return data;
  },
  deleteSection: async (pageId, sectionId) => {
    const { data } = await api.delete(`/admin/pages/${pageId}/sections/${sectionId}`);
    return data;
  },
  reorderSections: async (pageId, sectionIds) => {
    // sectionIds: [1, 3, 2] array of IDs in new order
    const { data } = await api.put(`/admin/pages/${pageId}/sections/reorder`, { order: sectionIds });
    return data;
  }
};

// --- Media ---
export const mediaService = {
  getAllMedia: async () => {
    const { data } = await api.get('/admin/media');
    return data;
  },
  uploadMedia: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/admin/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  deleteMedia: async (id) => {
    const { data } = await api.delete(`/admin/media/${id}`);
    return data;
  },
};

// --- Applications / Leads ---
export const applicationsService = {
  // Public
  submitApplication: async (payload) => {
    const { data } = await api.post('/applications', payload);
    return data;
  },
  // Admin
  getAllApplications: async (params = {}) => {
    const { data } = await api.get('/admin/applications', { params });
    return data;
  },
  updateStatus: async (id, status, notes) => {
    const { data } = await api.patch(`/admin/applications/${id}`, { status, notes });
    return data;
  },
  deleteApplication: async (id) => {
    const { data } = await api.delete(`/admin/applications/${id}`);
    return data;
  },
};

export default api;
