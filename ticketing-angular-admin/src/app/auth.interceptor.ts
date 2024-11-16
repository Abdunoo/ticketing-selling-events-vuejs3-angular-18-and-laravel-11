import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenKey = 'authToken';

  constructor(private router: Router, private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const token = localStorage.getItem(this.tokenKey);

    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // Jika method request adalah PUT, ubah ke POST dan tambahkan _method ke payload
    if (req.method === 'PUT') {
      // Ambil FormData asli dari req.body
      const originalPayload = req.body as FormData;

      // Buat objek kosong untuk menyimpan data FormData
      const payloadObj: { [key: string]: any } = {};

      // Iterasi pada entri FormData dan simpan dalam objek
      originalPayload.forEach((value, key) => {
        payloadObj[key] = value;
      });

      // Tambahkan _method ke objek
      const newPayload: { [key: string]: any } = {  // Tambahkan tipe data di sini
        ...payloadObj,
        _method: 'PUT'
      };

      // Buat FormData baru dari objek
      const formData = new FormData();
      for (const key in newPayload) {
        formData.append(key, newPayload[key]);
      }

      authReq = authReq.clone({
        method: 'POST',
        body: formData // Gunakan FormData baru
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          window.alert(error.error.message);
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }
}
