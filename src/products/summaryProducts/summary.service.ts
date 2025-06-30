import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummaryDto } from 'src/dto/summary.dto/summary.dto';
import { SummaryDocument, Summary } from 'src/models/products/summary.schema/summary.schema';


@Injectable()
export class SummaryService {
    constructor(@InjectModel(Summary.name) private readonly summaryModel: Model<SummaryDocument>,) {}

  async create(dto: SummaryDto): Promise<Summary> {
    const summary = new this.summaryModel(dto);
    return summary.save();
  }
  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().exec();
  }

  async findOne(id: string): Promise<Summary> {
    const summary = await this.summaryModel.findById(id).exec();
    if (!summary) throw new NotFoundException(`Summary #${id} not found`);
    return summary;
  }

  async update(id: string, dto: Partial<SummaryDto>): Promise<Summary> {
    const updated = await this.summaryModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Summary #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.summaryModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Summary #${id} not found`);
    return { deleted: true };
  }
}
