import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DividendHistoryService } from './dividend-history.service';
import { CreateDividendHistoryDto } from './dto/create-dividend-history.dto';
import { UpdateDividendHistoryDto } from './dto/update-dividend-history.dto';

@Controller('dividend-history')
export class DividendHistoryController {
  constructor(private readonly dividendHistoryService: DividendHistoryService) {}

  @Post()
  create(@Body() createDividendHistoryDto: CreateDividendHistoryDto) {
    return this.dividendHistoryService.create(createDividendHistoryDto);
  }

  @Get()
  findAll() {
    return this.dividendHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dividendHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDividendHistoryDto: UpdateDividendHistoryDto) {
    return this.dividendHistoryService.update(+id, updateDividendHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dividendHistoryService.remove(+id);
  }
}
