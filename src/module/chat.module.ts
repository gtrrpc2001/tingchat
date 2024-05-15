import { Module } from '@nestjs/common';
import { ChatController } from 'src/controller/chat.controller';
import { ChatService } from 'src/service/chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ecg, EcgSchema } from 'src/schema/chatSchema';
import { ChatWebsocket } from 'src/service/chat.websocket';



@Module({
  imports: [    
    MongooseModule.forFeature([{name:Ecg.name,schema:EcgSchema}]),          
],
  controllers: [ChatController],  
  providers: [ChatService,ChatWebsocket],
})

export class ChatModule{}