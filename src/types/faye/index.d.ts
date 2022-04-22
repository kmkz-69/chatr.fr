declare module 'faye' {
  export class Client {
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }

    publish(channel: string, data: any) {}

    subscribe(channel: string, callback: (data: any) => void) {}

    unsubscribe(channel: string) {}
  }
}
