import { Injectable } from '@nestjs/common';
import { CreateDividendHistoryDto } from './dto/create-dividend-history.dto';
import { UpdateDividendHistoryDto } from './dto/update-dividend-history.dto';

@Injectable()
export class DividendHistoryService {
  create(createDividendHistoryDto: CreateDividendHistoryDto) {
    return 'This action adds a new dividendHistory';
  }

  findAll() {
    return `This action returns all dividendHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dividendHistory`;
  }

  update(id: number, updateDividendHistoryDto: UpdateDividendHistoryDto) {
    return `This action updates a #${id} dividendHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} dividendHistory`;
  }
}
