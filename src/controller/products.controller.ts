import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express'
@Controller('products')
export class ProductsController {
  @Get('')
  GetAll(
    @Query('brand') brand: number,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return `product: limit => ${limit} and ${offset}`;
  }

  @Get('filter')
  getProductFilter() {
    return `I'm a filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return { 
        message: 'Product information',
        productId,
      };
  }

  @Post()
  createOne(@Body() payload: any) {
    return {
      message: 'New Product was created',
      payload,
    };
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }
}
