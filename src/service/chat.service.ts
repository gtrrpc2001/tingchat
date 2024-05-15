import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model, ObjectId, UpdateWriteOpResult} from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { Ecg } from 'src/schema/chatSchema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Ecg.name) private ecgModel: Model<Ecg>,        
  ){}  

  async create(ecg:ChatDto): Promise<Ecg>{
    try{     
      
      return await this.ecgModel.create(ecg)
      // const createdEcg = new this.ecgModel(ecg);          
      // return await createdEcg.save();
    }catch(E){
      console.log(E)
      console.log(E.stack)
    }    
  }

  async findAll():Promise<Ecg[]>{
    // mongoose.model(Ecg.name,EcgSchema,'realtimeEcg')
    return await this.ecgModel.find().exec()
  }

  async findMany(eq:string,startDate:string,endDate:string):Promise<Ecg[]>{
    return await this.ecgModel.find({
      eq:eq,
      writetime:{
      $gte:startDate,
      $lt:endDate
    }})
  }

  async findOne(eq:string):Promise<Ecg>{
    return await this.ecgModel.findOne({eq});
  }

  async findOneAndUpdate(ecg:ChatDto):Promise<Ecg>{    
    const updatedEcg = await this.ecgModel.findOneAndUpdate({eq:ecg.eq},{$set:{writetime:ecg.writetime}},{new:true})
    return updatedEcg
  }

  async updateMany(ecg:ChatDto):Promise<UpdateWriteOpResult>{    
    const updatedEcg = await this.ecgModel.updateMany({eq:ecg.eq},{$set:{writetime:ecg.writetime}},{new:true})
    return updatedEcg
  }

  async delete(ecg:ChatDto):Promise<{deletedCount: number}>{    
    const deletedEcg = await this.ecgModel.deleteMany({eq:ecg.eq}).exec();
    return deletedEcg
  }
}
