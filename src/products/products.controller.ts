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
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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
  findAllProducts(@Query() paginationDto: PaginationDto) {
    const pattern = { cmd: 'find_all' };
    return this.productsClient.send(pattern, paginationDto);
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
