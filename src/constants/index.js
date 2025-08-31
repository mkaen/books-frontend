export const APP_CONFIG = {
    pageTitle: 'Book Lending System',
    version: '1.0.0',
    sessionTimeout: 10
}

export const API_BASE = 'http://127.0.0.1:5001';
export const API_ENDPOINTS = {
    books: '/book_api',
    user: '/user_api'
}

export const DEFAULT_LEND_DURATION = 28;
export const EMAIL_VALIDATION_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/