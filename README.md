## Password hashing 
### Install bcrypt/types
```
$ npm i bcrypt
$ npm i -D @types/bcrypt
```
### Hashing values
```
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
const password = 'random_password';
const hash = await bcrypt.hash(password, saltOrRounds);
```

### Generating salt
```
const salt = await bcrypt.genSalt();
```
### Compare hash 
```
const isMatch = await bcrypt.compare(password, hash);
```
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
