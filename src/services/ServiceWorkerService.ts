import { isPlatform } from '@ionic/react';
import { Platforms } from '@ionic/core';
import { some } from 'lodash';
import * as serviceWorker from '../serviceWorker';

export default class ServiceWorkerService {
  private static ignorePlatforms: Platforms[] = ['cordova', 'electron'];

  static registerWorker(): void {
    const isIgnoredPlatform = some(
      ServiceWorkerService.ignorePlatforms,
      (platform: Platforms) => isPlatform(platform),
    );
    if (!isIgnoredPlatform) serviceWorker.register();
  }
}
