import { IsString, IsEnum, IsDateString,} from 'class-validator';
import { IndustryClassification } from 'src/models/products/industry.enum';
import { PCB_Category } from 'src/models/products/PCBcategory.enum';
import { Manufacturer } from 'src/models/products/manufacturer.enum';
import { Manufacturing_Location } from 'src/models/products/manufacturingLocation.enum';

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

  @IsEnum(Manufacturing_Location)
  Manufacturing_Location: Manufacturing_Location;

  @IsDateString()
  Production_Date: Date;

  @IsString()
  Short_Description?: string;

  @IsString()
  imageUrl?: string;

  @IsString()
  additionalImageUrl?: string[];
}
