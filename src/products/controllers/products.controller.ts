import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Res,
  //ParseIntPipe
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ProductsService } from 'src/products/services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  @ApiOperation( {summary: 'List of products'})
  GetAll(
    @Query('brand') brand: number,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `I'm a filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  @Post()
  createOne(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productService.delete(+id);
  }
}
