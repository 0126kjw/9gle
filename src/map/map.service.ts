import { Injectable, NotFoundException } from '@nestjs/common';

const fs = require('fs');
const name = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

@Injectable()
export class MapService {
  async findMap(id: string): Promise<object> {
    for (let i in name) {
      const jsonFile = fs.readFileSync(`src/map/data/${name[i]}.json`, 'utf8');
      const jsonData = JSON.parse(jsonFile);
      if (id === jsonData._id) {
        console.log(`Response: ${jsonData.name}`);
        return await jsonData;
      }
    }
    throw new NotFoundException('id 값이 존재하지 않습니다.');
  }

  async findPlace(id: string): Promise<object> {
    const jsonFile = fs.readFileSync(`src/map/data/mapPin.json`, 'utf8');
    const jsonData = JSON.parse(jsonFile);
    for (let i in name) {
      const data = jsonData.Map[i];
      if (id === data._id) {
        console.log(`Response: ${data.name} List`);
        return await data;
      }
    }
    throw new NotFoundException('id 값이 존재하지 않습니다.');
  }
}
