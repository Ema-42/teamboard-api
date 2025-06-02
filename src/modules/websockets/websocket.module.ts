import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [WebsocketGateway],
})
export class WebSocketModule {
  // This module is intentionally left empty.
  // It serves as a placeholder for WebSocket-related functionality.
  // You can add providers, controllers, or other modules as needed in the future.
}
