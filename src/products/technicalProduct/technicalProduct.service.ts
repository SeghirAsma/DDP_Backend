import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TechnicalDto } from 'src/dto/technical.dto/technical.dto';
import { Technical, TechnicalDocument } from 'src/models/products/technical.schema/technical.schema';

@Injectable()
export class TechnicalProductService {
    constructor(@InjectModel(Technical.name) private readonly TechnicalModel: Model<TechnicalDocument>,) {}
        
          async create(dto: TechnicalDto): Promise<Technical> {
            const technical = new this.TechnicalModel(dto);
            const savedtraceability = await technical.save();
                            const populatedtraceability= await this.TechnicalModel.findById(savedtraceability._id).populate('summaryId').exec();
                            return populatedtraceability as unknown as Technical;
          }
          
          async findAll(): Promise<Technical[]> {
            return this.TechnicalModel.find().exec();
          }
        
          async findOne(id: string): Promise<Technical> {
            const technical = await this.TechnicalModel.findById(id).exec();
            if (!technical) throw new NotFoundException(`Technical #${id} not found`);
            return technical;
          }
        
          async update(id: string, dto: Partial<TechnicalDto>): Promise<Technical> {
            const updated = await this.TechnicalModel
              .findByIdAndUpdate(id, dto, { new: true })
              .exec();
            if (!updated) throw new NotFoundException(`Technical #${id} not found`);
            return updated;
          }
        
          async remove(id: string): Promise<{ deleted: boolean }> {
            const result = await this.TechnicalModel.findByIdAndDelete(id).exec();
            if (!result) throw new NotFoundException(`Technical #${id} not found`);
            return { deleted: true };
          }
}
