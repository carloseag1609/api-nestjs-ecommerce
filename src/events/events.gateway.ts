import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('updateStock')
  handleEvent(@MessageBody() message: string): void {
    this.server.emit('msgToClient', message);
  }
}
