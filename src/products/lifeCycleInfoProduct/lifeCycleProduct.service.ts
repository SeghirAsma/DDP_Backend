import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LifeCycleDto } from 'src/dto/lifeCycle.dto/lifeCycle.dto';
import { LifeCycle, LifeCycleDocument } from 'src/models/products/lifecycle.schema/lifecycle.schema';

@Injectable()
export class LifeCycleProductService {
     constructor(
                @InjectModel(LifeCycle.name)
                private readonly lifeCycleModel: Model<LifeCycleDocument>,
              ) {}

           async create(dto: LifeCycleDto): Promise<LifeCycle> {
            
                const lifeCycle = new this.lifeCycleModel(dto);
                const savedlifeCycle = await lifeCycle.save();
                const populatedlifeCycle = await this.lifeCycleModel.findById(savedlifeCycle._id).populate('summaryId').exec();
                return populatedlifeCycle as unknown as LifeCycle;
              }
            
              async findAll(): Promise<LifeCycle[]> {
                return this.lifeCycleModel.find().exec();
              }
            
              async findOne(id: string): Promise<LifeCycle> {
                const lifeCycle = await this.lifeCycleModel.findById(id).exec();
                if (!lifeCycle) throw new NotFoundException(`lifeCycle #${id} not found`);
                return lifeCycle;
              }
            
              async update(id: string, dto: Partial<LifeCycleDto>): Promise<LifeCycle> {
                const updated = await this.lifeCycleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
                if (!updated) throw new NotFoundException(`lifeCycle #${id} not found`);
                return updated;
              }
            
              async remove(id: string): Promise<{ deleted: boolean }> {
                const result = await this.lifeCycleModel.findByIdAndDelete(id).exec();
                if (!result) throw new NotFoundException(`lifeCycle #${id} not found`);
                return { deleted: true };
              }
}
