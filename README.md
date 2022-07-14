# GIS Logexpert JS SDK

## Installation
```
npm install @logexpert/gis-sdk
```

## Usage

### Basic

```javascript
import { Logexpert } from '@logexpert/gis-sdk'
const sdk = new Logexpert('gis.logexpert.ru')

sdk.auth.static('<your token>')
//or
sdk.auth.login('<username>', '<password>')

const objects = await sdk.objects.readByQuery({
    $top: 10,
    $select: ['Id', 'Name']
})
```

### Get points
```javascript
import { Logexpert } from '@logexpert/gis-sdk'
const sdk = new Logexpert('gis.logexpert.ru')
const points = await sdk.trackPoints.read('<object id>',
    new Date('2022-17-14T00:00:00'), new Date('2022-07-14T23:59:59'))
```

