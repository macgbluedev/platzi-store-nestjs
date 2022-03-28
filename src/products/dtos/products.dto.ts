import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: `Product's name`})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: `Description's name`})
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: `Price`})
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({description: `Stock`})
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({description: `Image`})
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
