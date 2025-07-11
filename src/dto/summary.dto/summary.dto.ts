import { IsString, IsEnum, IsDateString, IsBoolean,} from 'class-validator';
import { IndustryClassification } from 'src/models/products/industry.enum';
import { PCB_Category } from 'src/models/products/PCBcategory.enum';
import { Manufacturer } from 'src/models/products/manufacturer.enum';
//import { Manufacturing_Location } from 'src/models/products/manufacturingLocation.enum';

export class SummaryDto {
  @IsString()
  Productid: string;

  @IsString()
  ProductName: string;

  @IsEnum(IndustryClassification)
  industryClassification: IndustryClassification;

  @IsEnum(PCB_Category)
  category: PCB_Category;

  @IsEnum(Manufacturer)
  Manufacturer: Manufacturer;

  @IsString()
  Manufacturing_Location: string;

  @IsDateString()
  Production_Date: Date;

  @IsString()
  Short_Description?: string;

  @IsString()
  imageUrl?: string;

  @IsString()
  additionalImageUrl?: string[];

  @IsBoolean()
  IsDraft: boolean; 
}
