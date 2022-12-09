import { BadRequestException, Injectable } from '@nestjs/common';
import { ExhibitionService } from '../exhibitions/exhibitions.service';
import { MuseumService } from '../museums/museums.service';

@Injectable()
export class SearchService {
  constructor(
    private museumService: MuseumService,
    private exhibitionService: ExhibitionService,
  ) {}

  async search(option: string, keyword: string): Promise<object> {
    switch (option) {
      case 'museum':
        return await this.museumService.searchMuseum(keyword);
      case 'exhibition':
        return await this.exhibitionService.searchExhibition(keyword);
      default:
        throw new BadRequestException();
    }
  }

  async searchTitle(keyword: string): Promise<object> {
    const museumTitleList = [];
    const musuems = await this.museumService.searchMuseum(keyword);
    for (let i = 0; i < musuems.length; i++) {
      museumTitleList.push(musuems[i].name);
    }
    return museumTitleList;
  }
}
