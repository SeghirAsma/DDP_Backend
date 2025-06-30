import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TraceabilityDto } from 'src/dto/traceability.dto/traceability.dto';
import { Traceability, TraceabilityDocument } from 'src/models/products/traceability.schema/traceability.schema';

@Injectable()
export class TraceabilityProductService {
     constructor(@InjectModel(Traceability.name) private readonly TraceabilityModel: Model<TraceabilityDocument>,) {}
    
      async create(dto: TraceabilityDto): Promise<Traceability> {
        const traceability = new this.TraceabilityModel(dto);
        const savedtraceability = await traceability.save();
                        const populatedtraceability= await this.TraceabilityModel.findById(savedtraceability._id).populate('summaryId').exec();
                        return populatedtraceability as unknown as Traceability;
      }
      
      async findAll(): Promise<Traceability[]> {
        return this.TraceabilityModel.find().exec();
      }
    
      async findOne(id: string): Promise<Traceability> {
        const traceability = await this.TraceabilityModel.findById(id).exec();
        if (!traceability) throw new NotFoundException(`traceability #${id} not found`);
        return traceability;
      }
    
      async update(id: string, dto: Partial<TraceabilityDto>): Promise<Traceability> {
        const updated = await this.TraceabilityModel
          .findByIdAndUpdate(id, dto, { new: true })
          .exec();
        if (!updated) throw new NotFoundException(`traceability #${id} not found`);
        return updated;
      }
    
      async remove(id: string): Promise<{ deleted: boolean }> {
        const result = await this.TraceabilityModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException(`traceability #${id} not found`);
        return { deleted: true };
      }
}
