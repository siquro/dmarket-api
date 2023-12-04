import { Injectable } from '@nestjs/common';
import { ApiDTOMarketRequest } from './apiDTOMarketRequest';

@Injectable()
export class ApiService {
  getList(request: ApiDTOMarketRequest) {
    return '';
  }
}
