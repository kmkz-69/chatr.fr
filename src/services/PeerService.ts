import Peer, { MediaConnection } from 'peerjs';
import { History } from 'history';
import { includes } from 'lodash';
import routes from '../routes';
import AlertService from './AlertService';
import 'dotenv/config';

export default class PeerService {
  private static options = {
    host: 'localhost',
    port: 3001,
    path: '/peer',
    secure: true,
  };

  private client: Peer;

  constructor() {
    this.client = new Peer(PeerService.options);
  }

  private getErrorMessage(type: string): string {
    switch (type) {
      case 'browser-incompatible':
        return "Device doesn't support WebRTC";
      case 'disconnected':
        return 'Already disconnected meeting';
      case 'invalid-id':
        return 'Invalid connection ID';
      case 'invalid-key':
        return 'Invalid API key';
      case 'network':
        return "Can't establish network connection";
      case 'peer-unavailable':
        return "Meeting ID doesn't exist";
      case 'ssl-unavailable':
        return "Server doesn't support SSL";
      case 'server-error':
        return 'Unable to reach server';
      case 'socket-error':
        return 'Underlying socket error';
      case 'socket-closed':
        return 'Underlying socket closed';
      case 'unavailable-id':
        return 'Connection ID already taken';
      case 'webrtc':
        return 'WebRTC error';
      default:
        return 'Something went wrong';
    }
  }

  handleErrors(history: History) {
    this.client.on('error', (error) => {
      const { type } = error;
      const message = this.getErrorMessage(type);
      AlertService.push(message);
      const routeErrorTypes = ['network', 'server-error', 'peer-unavailable'];
      const canRoute = includes(routeErrorTypes, type);
      if (canRoute) history.push(routes.home.path);
    });
  }

  onOpen(callback: (localConnectionId: string) => void): void {
    this.client.on('open', (localConnectionId) => callback(localConnectionId));
  }

  call(
    meetingId: string,
    stream: MediaStream,
    callback: (call: MediaConnection) => void,
  ): void {
    const call = this.client.call(meetingId, stream);
    callback(call);
  }

  onReceiveCall(callback: (call: MediaConnection) => void): void {
    this.client.on('call', (call) => callback(call));
  }

  answerCall(call: MediaConnection, localStream: MediaStream): void {
    call.answer(localStream);
  }

  onCalling(
    call: MediaConnection,
    callback: (remoteConnectionId: string, remoteStream: MediaStream) => void,
  ): void {
    call.on('stream', (remoteStream) => {
      const remoteConnectionId = call.peer;
      callback(remoteConnectionId, remoteStream);
    });
  }

  disconnect(): void {
    this.client.destroy();
  }

  onDisconnect(callback: () => void): void {
    this.client.on('close', () => callback());
  }
}
