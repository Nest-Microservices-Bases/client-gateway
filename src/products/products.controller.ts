import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(@Body() body: any) {
    return `Create a new product with data: ${JSON.stringify(body)}`;
  }

  @Get()
  findAllProducts() {
    return 'Find all products';
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
