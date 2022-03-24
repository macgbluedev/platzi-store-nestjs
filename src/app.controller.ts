import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo'; //this.appService.getHello()
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('products')
  getProducts(
    @Query('brand') brand: number,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return `product: limit => ${limit} and ${offset}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and ${id}`;
  }
}
