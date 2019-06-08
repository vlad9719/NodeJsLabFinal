import { Controller, Get, Query } from '@nestjs/common';
import { QueryParams } from './validation/query.params';
import { SearchService } from './search.service';

@Controller('/api/search')
export class SearchController {

  constructor(
    private readonly searchService: SearchService,
  ) {}

  @Get()
  async search(@Query() params: QueryParams) {
    return await this.searchService.search(params.query);
  }
}
