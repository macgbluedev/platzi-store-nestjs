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
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from 'src/services/products.service';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
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
  getOne(@Param('productId') productId: string) {
    return this.productService.findOne(+productId);
  }

  @Post()
  createOne(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() payload: any) {
    return this.productService.update(+id, payload)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productService.delete(+id)
  }
}
