import BaseResponse from '../../model/BaseResponse';
import apiClient from '../client';

export function signUpAPI(fullName: string, email: string, password: string) {
  return apiClient.post<BaseResponse<any>>('/signup', {
    fullName,
    email,
    password,
  });
}

export function logInAPI(email: string, password: string) {
  return apiClient.post<BaseResponse<any>>('/login', {
    email,
    password,
  });
}

export function verifyEmailAPI(userId: string, otp: string) {
  return apiClient.post('/verify-email', {
    userId,
    otp,
  });
}

export function verifyOTPResetPass(email: string, otp: string) {
  return apiClient.post('/verify-otp-reset-pass', {
    email,
    otp,
  });
}

export function resetPassword(email: string, password: string) {
  return apiClient.post('/reset-password', {
    email,
    password,
  });
}

export function forgotPassword(email: string) {
  return apiClient.post('/forgot-password', {
    email,
  });
}

export function getUserDetails(id: string) {
  return apiClient.get(`/user/${id}`);
}

export function deleteUserWord(userId: string, wordId: string) {
  return apiClient.delete(`/delete-word/user/${userId}/${wordId}`);
}
