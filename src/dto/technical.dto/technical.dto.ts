import { IsString, IsMongoId, IsEnum, IsNumber, IsBoolean,} from 'class-validator';
import { BaseMaterial } from 'src/models/products/baseMaterial.enum';
import { FlameRetardancy } from 'src/models/products/flameRetardancy.enum';
import { SurfaceFinish } from 'src/models/products/surfaceFinish.enum';

export class TechnicalDto {

  @IsNumber()
  weight: number;

  @IsNumber()
  numberOfLayers: number;

  @IsEnum(BaseMaterial)
  baseMaterial: BaseMaterial;

  @IsEnum(FlameRetardancy)
  flameRetardancy: FlameRetardancy;

  @IsEnum(SurfaceFinish)
  surfaceFinish: SurfaceFinish;

  @IsNumber()
  tg?: number;

  @IsNumber()
  total_PCB_Thickness?: number;

  @IsNumber()
  copper_Thickness?: number;

  @IsNumber()
  dielectric_Constant?: number;

  @IsNumber()
  range_Temperature?: number;

  @IsNumber()
  max_Current_Carrying?: number;

  @IsBoolean()
  controlled_Impedance_Supported?: boolean;

  @IsBoolean()
  IsDraft: boolean; 

  @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
  summaryId: string;
}
