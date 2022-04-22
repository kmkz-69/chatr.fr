import StorageService from '../../services/StorageService';

interface Key {
  pwaInstallPrompted: string;
  accessToken: string;
}

type AccessTokenGetCallback = (accessToken: string | null) => void;
type PwaPromptCheckCallback = (pwaPrompted: boolean) => void;

export default class AppStorage {
  private key: Key;
  private storageService: StorageService;

  constructor() {
    this.key = {
      pwaInstallPrompted: 'pwaInstallPrompted',
      accessToken: 'accessToken',
    };
    this.storageService = new StorageService();
  }

  async checkPwaPrompted(callback: PwaPromptCheckCallback) {
    const pwaPromptedValue = await this.storageService.get(
      this.key.pwaInstallPrompted,
    );
    const pwaPrompted = pwaPromptedValue
      ? Boolean(JSON.parse(pwaPromptedValue))
      : false;
    callback(pwaPrompted);
  }

  async setPwaInstallPrompted(callback: () => void) {
    const pwaPrompted = JSON.stringify(true);
    await this.storageService.set(this.key.pwaInstallPrompted, pwaPrompted);
    callback();
  }

  async getAccessToken(callback: AccessTokenGetCallback) {
    const accessToken = await this.storageService.get(this.key.accessToken);
    callback(accessToken);
  }

  async setAccessToken(accessToken: string, callback: () => void) {
    await this.storageService.set(this.key.accessToken, accessToken);
    callback();
  }

  async removeAccessToken(callback: () => void) {
    await this.storageService.remove(this.key.accessToken);
    callback();
  }
}
