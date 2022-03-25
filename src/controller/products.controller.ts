import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

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

  @Get('products/:productId')
  getOne(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Post()
  createOne(@Body() payload: any) {
      return {
          message: 'New Product was created',
          payload
      }
  }

}
