import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'More details for product 1',
      price: 122,
      stock: 50,
      image: 'https//:URIForImage',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct: Product = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      const indexProduct = this.products.findIndex((p) => p.id === id);
      this.products[indexProduct] = {
        ...product,
        ...payload,
      };
      return this.products[indexProduct];
    }
    return null;
  }

  delete(id: number) {
    const indexProduct = this.products.findIndex((product) => product.id == id);
    if (indexProduct === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(indexProduct, 1);
    return true;
  }
}
