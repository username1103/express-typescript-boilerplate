# Express-Typescript-Boilerplate

## Git clone

```bash
git clone https://github.com/username1103/express-typescript-boilerplate.git
```

## Install dependencies

```bash
npm i
```

## Feature

- **Database**: [mysql2](https://github.com/sidorares/node-mysql2) with [typeorm](https://github.com/typeorm/typeorm)
- **Authentication**: [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc), [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) and [joi-to-swagger](https://github.com/Twipped/joi-to-swagger)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Environment Variables

환경변수 파일(`.env` file) 수정

```bash
# Port Number
PORT = 9850

# DB Setting (MySQL)
DB = mysql
DB_HOST = localhost
DB_PORT = 3306
DB_USERNAME = name
DB_PASSWORD = password
DB_DATABASE = test

# Swagger express-basic-auth Authentication
SW_ID = id
SW_PASSWORD = password

# JWT
JWT_SECRET=Thisissamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
```

## Ormconfig

아래에서 처럼 `ormconfig.ts` 파일로 부터 config를 불러와 typeorm 연결을 하기 때문에, `/src/config/ormconfig.ts` 파일내에 ormconfig를 환경변수에 맞게 설정해야 한다.

```javascript
// /src/index.ts
createConnection(ormconfig[config.env]).then(() => {
  logger.info('Conneted to MySQL');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});
```

```javascript
// /src/config/ormconfig.ts
export default {
  production: {},
  test: {
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  },
  development: {},
} as { [key in Node_Env]: ConnectionOptions };
```

## Project Structure

```
src\
 |--config\         # 환경 변수 및 config 정보
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--entities\       # typeorm data entity (data layer)
 |--interfaces\     # interface generated by joi schema
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--types\          # interface or types
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## Validation

`src/validaions`에 정의한 `validation.ts`파일들을 이용해 validate을 진행한다.

```javascript
import express from 'express';
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';

const router = express.Router();

router.get('/', validate(userValidation.getUsers), userController.getUsers);
```

## Generate interface with joi schema

```
npm run types
```

[joi-to-typescript](https://github.com/mrjono1/joi-to-typescript)을 사용해 작성된 `/scripts/types.ts` 파일을 실행함으로써, `/src/validations`폴더 내의 Joi schema로 부터 Request interface를 생성합니다.

## Generate swagger requestBody and parameters

[joi-to-swagger](https://github.com/Twipped/joi-to-swagger)을 사용해 작성된 `/utils/request-to-swagger.ts getReuestSwaggerFormFor` 함수를 이용해 swagger docs의 `parameters`와 `requestBody`를 `/src/validations` 폴더 내 Request Joi schema로 부터 자동으로 만들어줍니다.

```javascript
import { authValidation } from '../../validations';
import { getRequestSwaggerFormFor } from '../../utils/request-to-swagger';
import definitions from '../../docs/definitions';
import components from '../../docs/components';

export const swAuthRouter = {
  '/auth/register': {
    post: {
      summary: '회원가입',
      description: '사용자 정보를 저장하고 인증 토큰을 제공합니다.',
      tags: ['Auth'],
      ...getRequestSwaggerFormFor(authValidation.register),
      responses: {
        '201': {
          ...
        },
        '400': {
          ...
        },
      },
    },
  },
}
```

## Authentication

`auth` middleware를 추가해 줌으로서 router로 들어오는 요청에 대해 jwt 사용자 인증을 진행합니다.

```javascript
import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import { userController } from '../../controllers';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/:userId', auth, validate(userValidation.getUser), userController.getUser);
```
