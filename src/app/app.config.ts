
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { AlertModule } from '@full-fledged/alerts';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from '../providers/token.interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([tokenInterceptor]),
      withFetch(),
    ),
    importProvidersFrom(
      AlertModule.forRoot({ maxMessages: 5, timeout: 3000, positionX: 'right' }),
      ToastrModule.forRoot(),
    ),
    provideAnimationsAsync()
  ]
};
