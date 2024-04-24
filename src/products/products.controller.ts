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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() body: any) {
    return `Create a new product with data: ${JSON.stringify(body)}`;
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    const pattern = { cmd: 'find_all' };
    return this.productsClient.send(pattern, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // PERF: The following code is an alternative way to handle the error (Observable)
    return this.productsClient.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // NOTE: The following code is an alternative way to handle the error (Promise)
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `Remove a product with id: ${id}`;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return `Update a product with id: ${id} with data: ${JSON.stringify(body)}`;
  }
}
