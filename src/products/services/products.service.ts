import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId += 1;
  //   const newProduct: Product = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: any) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const indexProduct = this.products.findIndex((p) => p.id === id);
  //     this.products[indexProduct] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[indexProduct];
  //   }
  //   return null;
  // }

  // delete(id: number) {
  //   const indexProduct = this.products.findIndex((product) => product.id == id);
  //   if (indexProduct === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(indexProduct, 1);
  //   return true;
  // }
}
