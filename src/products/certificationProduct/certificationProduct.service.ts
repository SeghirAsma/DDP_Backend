import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CertifDto } from 'src/dto/certif.dto/certif.dto';
import { Certification, CertificationDocument } from 'src/models/products/certifications.schema/certification.schema';

@Injectable()
export class CertificationProductService {
     constructor(@InjectModel(Certification.name) private readonly CertificationModel: Model<CertificationDocument>,) {}
        
          async create(dto: CertifDto): Promise<Certification> {
            const certification = new this.CertificationModel(dto);
            const savedcertification= await certification.save();
                            const populatedcertification= await this.CertificationModel.findById(savedcertification._id).populate('summaryId').exec();
                            return populatedcertification as unknown as Certification;
          }
          
          async findAll(): Promise<Certification[]> {
            return this.CertificationModel.find().exec();
          }
        
          async findOne(id: string): Promise<Certification> {
            const certification = await this.CertificationModel.findById(id).exec();
            if (!certification) throw new NotFoundException(`certification #${id} not found`);
            return certification;
          }
        
          async update(id: string, dto: Partial<CertifDto>): Promise<Certification> {
            const updated = await this.CertificationModel
              .findByIdAndUpdate(id, dto, { new: true })
              .exec();
            if (!updated) throw new NotFoundException(`certification #${id} not found`);
            return updated;
          }
        
          async remove(id: string): Promise<{ deleted: boolean }> {
            const result = await this.CertificationModel.findByIdAndDelete(id).exec();
            if (!result) throw new NotFoundException(`certification #${id} not found`);
            return { deleted: true };
          }
}
