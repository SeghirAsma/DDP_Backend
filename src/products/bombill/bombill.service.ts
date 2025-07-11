import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bom, BomDocument } from 'src/models/products/bom.schema/bom.schema';

@Injectable()
export class BombillService {
     constructor(@InjectModel(Bom.name) private readonly bomModel: Model<BomDocument>) {}

  async create(data: Partial<Bom>): Promise<Bom> {
    const bom = new this.bomModel(data);
    const savedBom = await bom.save();
    const populatedBom = await this.bomModel.findById(savedBom._id).populate('summaryId').exec();
    return populatedBom as unknown as Bom;
  }
  
  async createMany(data: Partial<Bom>[]): Promise<Bom[]> {
  const result = await this.bomModel.insertMany(data);
  return result as unknown as Bom[];
}


   async findAll(): Promise<Bom[]> {
    return this.bomModel.find().exec();}
          
    async findOne(id: string): Promise<Bom> {
        const bom = await this.bomModel.findById(id).exec();
        if (!bom) throw new NotFoundException(`Bom #${id} not found`);
         return bom;
            }


  async delete(id: string): Promise<void> {
    await this.bomModel.findByIdAndDelete(id).exec();
  }



}
