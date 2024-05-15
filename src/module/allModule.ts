import { ConfigModule } from "@nestjs/config";
import { MongoConfig } from "src/module/mongoConfig";
import { ChatModule } from "./chat.module";
import { MongooseModule } from "@nestjs/mongoose";

export class AllModule{
    static allImport=[
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'.env',
        }),
        MongooseModule.forRootAsync({useClass:MongoConfig,inject:[MongoConfig]}),        
        ChatModule,
        
                

    ]
}