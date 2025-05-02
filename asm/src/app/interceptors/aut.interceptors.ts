import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const http = inject(HttpClient);

  const protectedEndpoints = ['/v1/category', '/v1/product'];

  const isProtectedAPI = protectedEndpoints.some(endpoint => req.url.includes(endpoint));

  const isModifyingMethod = ['POST', 'PUT', 'DELETE'].includes(req.method.toUpperCase());

  if (!isProtectedAPI || !isModifyingMethod) {
    return next(req); // bỏ qua nếu không phải API cần bảo vệ
  }

  const loginData = localStorage.getItem('login');  

  if (!loginData) {
    location.assign('/login');
    return throwError(() => new Error('Not authenticated'));
  }

  const { accessToken, refreshToken, admin } = JSON.parse(loginData);

  let clonedReq = req;

  if (accessToken && admin) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

 
  return next(clonedReq).pipe(
    catchError(err => {
      if (err.status === 403 && refreshToken) {
        return http.post('http://127.0.0.1:8000/v1/account/refresh', { refreshToken }).pipe(
          switchMap((res: any) => {
            const newAccessToken = res.accessToken;
            const newRefreshToken = res.refreshToken;

            const currentLoginData = JSON.parse(loginData || '{}');
            const updatedLoginData = {
              ...currentLoginData,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            };

            localStorage.setItem('login', JSON.stringify(updatedLoginData));

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            return next(retryReq);
          }),
          catchError(() => {
            localStorage.removeItem('login');
            location.assign('/login');
            return throwError(() => new Error('Session expired'));
          })
        );
      }

      return throwError(() => err);
    })
  );
};
