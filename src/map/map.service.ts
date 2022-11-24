import { Injectable } from '@nestjs/common';

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
  findMap(id: string): object {
    for (let i in name) {
      const jsonFile = fs.readFileSync(`src/map/data/${name[i]}.json`, 'utf8');
      const jsonData = JSON.parse(jsonFile);
      if (id === jsonData._id) {
        console.log(`Response: ${jsonData.name}`);
        return jsonData;
      }
    }
    return { error: 'id 값이 존재하지 않습니다.' };
  }

  findPlace(id: string): object {
    const jsonFile = fs.readFileSync(`src/map/data/mapPin.json`, 'utf8');
    const jsonData = JSON.parse(jsonFile);
    for (let i in name) {
      const data = jsonData.Map[i];
      if (id === data._id) {
        console.log(`Response: ${data.name} List`);
        return data;
      }
    }
    return { error: 'id 값이 존재하지 않습니다.' };
  }
}
