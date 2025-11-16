import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, 
      withComponentInputBinding(),
      
    ),
    provideHttpClient(), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['es', 'en'],
          defaultLang: 'es',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
      , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
