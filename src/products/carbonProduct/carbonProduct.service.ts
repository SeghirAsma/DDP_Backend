import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarbonDto } from 'src/dto/carbon.dto/carbon.dto';
import { Carbon, CarbonDocument } from 'src/models/products/carbon.schema/carbon.schema';

@Injectable()
export class CarbonProductService {
     constructor(
            @InjectModel(Carbon.name)
            private readonly carbonModel: Model<CarbonDocument>,
          ) {}
        
          async create(dto: CarbonDto): Promise<Carbon> {
        
            const recycle = new this.carbonModel(dto);
            const savedRecycle = await recycle.save();
            const populatedRecycle = await this.carbonModel.findById(savedRecycle._id).populate('summaryId').exec();
            return populatedRecycle as unknown as Carbon;
          }
        
          async findAll(): Promise<Carbon[]> {
            return this.carbonModel.find().exec();
          }
        
          async findOne(id: string): Promise<Carbon> {
            const recycle = await this.carbonModel.findById(id).exec();
            if (!recycle) throw new NotFoundException(`Carbon #${id} not found`);
            return recycle;
          }
        
          async update(id: string, dto: Partial<CarbonDto>): Promise<Carbon> {
            const updated = await this.carbonModel.findByIdAndUpdate(id, dto, { new: true }).exec();
            if (!updated) throw new NotFoundException(`Carbon #${id} not found`);
            return updated;
          }
        
          async remove(id: string): Promise<{ deleted: boolean }> {
            const result = await this.carbonModel.findByIdAndDelete(id).exec();
            if (!result) throw new NotFoundException(`Carbon #${id} not found`);
            return { deleted: true };
          }
}
