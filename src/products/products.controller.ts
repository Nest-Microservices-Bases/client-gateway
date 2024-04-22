import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() body: any) {
    return `Create a new product with data: ${JSON.stringify(body)}`;
  }

  @Get()
  findAllProducts() {
    try {
      const pattern = { cmd: 'find_all' };
      return this.productsClient.send(pattern, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return `Find one product with id: ${id}`;
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return `Remove a product with id: ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return `Update a product with id: ${id} with data: ${JSON.stringify(body)}`;
  }
}
