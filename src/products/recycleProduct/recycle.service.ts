import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecycleDto } from 'src/dto/recycle.dto/recycle.dto';
import { Recycle, RecycleDocument } from 'src/models/products/recycle.schema/recycle.schema';

@Injectable()
export class RecycleService { constructor(
    @InjectModel(Recycle.name)
    private readonly recycleModel: Model<RecycleDocument>,
  ) {}

  async create(dto: RecycleDto): Promise<Recycle> {

    const recycle = new this.recycleModel(dto);
    const savedRecycle = await recycle.save();
    const populatedRecycle = await this.recycleModel.findById(savedRecycle._id).populate('summaryId').exec();
    return populatedRecycle as unknown as Recycle;
  }

  async findAll(): Promise<Recycle[]> {
    return this.recycleModel.find().exec();
  }

  async findOne(id: string): Promise<Recycle> {
    const recycle = await this.recycleModel.findById(id).exec();
    if (!recycle) throw new NotFoundException(`Recycle #${id} not found`);
    return recycle;
  }

  async update(id: string, dto: Partial<RecycleDto>): Promise<Recycle> {
    const updated = await this.recycleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Recycle #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.recycleModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Recycle #${id} not found`);
    return { deleted: true };
  }
}
