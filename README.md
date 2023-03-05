# Project : 북마크 관리 + ChatGPT를 이용한 면접 서비스 | 22.01 ~ 22.03
# Dev-mark 목차

1. [배포 페이지](#배포-페이지)
2. [프런트엔드 레포지토리](#프런트엔드-레포지토리)
3. [개발 일지](#개발-일지)
4. [Architecture](#architecture)
5. [테스트 코드 작성](#테스트-코드-작성)
6. [프레임워크 이전 리팩토링](#프레임워크-이전-리팩토링)
7. [서비스 소개](#서비스-소개)
8. [서비스 구현](#서비스-구현)
9. [개발환경](#개발환경)
10. [ERD](#erd)

# 배포 페이지

https://dev-mark-66ab1.web.app/

# 프런트엔드 레포지토리

https://github.com/ChangSuLee00/Dev-Mark-Front

# 개발 일지

https://kaput-geometry-436.notion.site/d8230eef4ced4582a6884d3d552734b0?v=0257760f0464402ca87762d4646d063c

---

# Architecture

<img width="578" alt="pfm-server2" src="https://user-images.githubusercontent.com/98637739/222736765-aa45f2ed-b817-4616-b812-57c2179cbf73.png">

Nginx를 이용해 리버스 프록시 서버를 구축하고 HTTPS 통신을 하도록 구성했습니다.

PM2를 이용해 클러스터를 만들어 무중단 서비스를 구현했습니다.

RDS를 이용해 서버의 예상치 못한 종료에 대비해 DB 클라우드화를 했습니다.

Firebase를 이용해 프런트엔드 서버를 배포했습니다.

Winston과 Daily Logger를 이용해 Log 파일을 관리하도록 했습니다.

Grafana와 CloudWatch를 이용해 인프라 모니터링 체계를 구축 했습니다 (비용문제로 현재는 삭제)

---

# 테스트 코드 작성

Unit Test를 작성해가며 Controller와 Service의 유효성을 테스트 했습니다.

![image](https://user-images.githubusercontent.com/98637739/222253623-c5f99914-fd06-4716-910b-43c5fc1590c4.png)

---

# 프레임워크 이전 리팩토링

Express -> Nest.js 

Nest.js 프레임 워크를 이용해 더 좋은 설계로 앱을 리팩토링하고 디자인패턴에 대해 공부하고 싶어 

Express로 개발을 완료한 어플리케이션을 Nest.js으로 재작성 했습니다.

Pipe-filter 패턴(DTO), Repository 패턴, Intercepter 패턴, Dependancy Injection을 이용한 의존성 역전 등

Nest.js의 설계에 대해 공부해가며 프로젝트를 만들었습니다.

---

# 서비스 소개

개발 공부를 하며 점점 늘어나는 북마크를 효율적으로 관리하고 싶다는 생각으로 서비스를 만들었습니다.

나중에 보기로 하고 다시 보지 않은 북마크들이 생기지 않도록 알람 기능을 추가하였습니다.

좋은 개발 관련 포스트를 다른 사람과 공유할 수 있는 기능이 있다면 더욱 좋은 서비스가 될 수 있을것 같아 피드 기능을 추가 했습니다.

기술 면접을 준비하면서 질문을 통해 더 많은 것들을 배운다는 것을 알게 되었습니다.

최근 성능을 인정받고 있는 ChatGPT의 데모 API를 이용해 기술면접에 대한 질문을 받고 그에 대한 대답을 피드백 받을 수 있도록 서비스를 만들었습니다. (데모 API이기 때문에 50글자 제한이 있습니다)

---

# 서비스 구현

## ChatGPT 기술 면접

<details>
<summary>gpt.service</summary>
<div markdown="1">

```javascript
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GptEntity } from './entities/gpt.entity';
import { Repository } from 'typeorm';
import { CreateGpt_Q_Dto } from './dto/create-gpt-question.dto';
import { CreateGpt_A_Dto } from './dto/create-gpt-answer.dto';

@Injectable()
export class GptService {
  constructor(
    @InjectRepository(GptEntity)
    private readonly gptRepository: Repository<GptEntity>,
  ) {}

  // Configuration
  configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);

  // Question
  async question(user: UserEntity, gpt: CreateGpt_Q_Dto) {
    // Config Error
    if (!this.configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Input Error
    if (gpt.techStack.trim().length === 0) {
      throw new Error('Please enter a valid tech stack');
    }

    // Generate Question
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: generatePromptQuestion(gpt.techStack),
        temperature: 0.6,
      });

      return { result: completion.data.choices[0].text };

      // Error handle
    } catch (error) {
      // console.error(error);
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error('An error occurred during your request');
      }
    }
  }

  // Answer
  async answer(user: UserEntity, gpt: CreateGpt_A_Dto) {
    // Config Error
    if (!this.configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Input Error
    if (gpt.answer.trim().length === 0) {
      throw new Error('Please enter a valid answer');
    }

    // Generate Question
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: generatePrompt(gpt.question, gpt.answer),
        temperature: 0.6,
      });

      return { result: completion.data.choices[0].text };

      // Error handle
    } catch (error) {
      // console.error(error);
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error('An error occurred during your request');
      }
    }
  }
}

function generatePromptQuestion(techStack) {
  // Generate Query
  const capitalizedQuestion =
    techStack[0].toUpperCase() + techStack.slice(1).toLowerCase();
  return `Give me tech-interview question
  about: ${capitalizedQuestion}
  in 50character`;
}

function generatePrompt(question, answer) {
  // Generate Query
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  const capitalizedAnswer =
    answer[0].toUpperCase() + answer.slice(1).toLowerCase();
  return `
  Question: ${capitalizedQuestion}.
  Answer: ${capitalizedAnswer}.
  if Answer is right = give me 'Right'.
  else if Answer is wrong = give me 'Wrong'.
  YOU MUST ANSWER WITHIN 50 CHARACTERS
  `;
}

```

</div>
</details>

<details>
<summary>gpt.service.spec (test)</summary>
<div markdown="1">

```javascript
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/user/entities/user.entity';
import { GptService } from '../gpt.service';

class MockOpenAI {
  constructor(private readonly configuration: any) {}
  async createCompletion_Q(gpt) {
    if (gpt.techStack) {
      return 'mock text';
    } else {
      throw new Error('An error occurred during your request');
    }
  }
  async createCompletion_A(gpt) {
    if (gpt.answer) {
      return 'mock text';
    } else {
      throw new Error('An error occurred during your request');
    }
  }
}

const config = {
  apiKey: 'mock-api-key',
};

const configuration = {
  apiKey: config.apiKey,
};

const openai = new MockOpenAI(configuration);

const mockGptService = () => ({
  question: jest.fn((user: UserEntity, gpt: any) => {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    if (gpt.techStack.trim().length === 0) {
      throw new Error('Please enter a valid tech stack');
    }
    return openai.createCompletion_Q(gpt);
  }),

  answer: jest.fn((user: UserEntity, gpt: any) => {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    if (gpt.answer.trim().length === 0) {
      throw new Error('Please enter a valid answer');
    }
    return openai.createCompletion_A(gpt);
  }),
  configuration,
  openai,
});

describe('GptService', () => {
  let spyGptService: GptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: GptService, useFactory: mockGptService }],
    }).compile();

    spyGptService = module.get<GptService>(GptService);
  });

  describe('Question', () => {
    const user = new UserEntity();
    const body = { techStack: 'javascript' };

    it('API_KEY 없을때 Error', async () => {
      configuration.apiKey = null;
      await expect(() => spyGptService.question(user, body)).toThrow(
        'OpenAI API key not configured',
      );
    });

    it('techStack 잘못 입력 되었을때 Error', async () => {
      configuration.apiKey = 'mock-api-key';
      body.techStack = ' ';
      await expect(() => spyGptService.question(user, body)).toThrow(
        'Please enter a valid tech stack',
      );
    });

    it('techStack 없을때 Error', async () => {
      configuration.apiKey = 'mock-api-key';
      body.techStack = null;
      await expect(() => spyGptService.question(user, body)).toThrowError();
    });

    it('질문 생성 성공', async () => {
      body.techStack = 'javascript';
      const response = await spyGptService.question(user, body);
      expect(response).toEqual('mock text');
    });
  });

  describe('Answer', () => {
    const user = new UserEntity();
    const body = { question: 'javascript', answer: 'good' };

    it('API_KEY 없을때 Error', async () => {
      configuration.apiKey = null;
      await expect(() => spyGptService.answer(user, body)).toThrow(
        'OpenAI API key not configured',
      );
    });

    it('answer 잘못 입력 되었을때 Error', async () => {
      configuration.apiKey = 'mock-api-key';
      body.answer = ' ';
      await expect(() => spyGptService.answer(user, body)).toThrow(
        'Please enter a valid answer',
      );
    });

    it('answer 없을때 Error', async () => {
      configuration.apiKey = 'mock-api-key';
      body.answer = null;
      await expect(() => spyGptService.answer(user, body)).toThrowError();
    });

    it('답변 생성 성공', async () => {
      body.answer = 'good';
      const response = await spyGptService.answer(user, body);
      expect(response).toEqual('mock text');
    });
  });
});

```

</div>
</details>

<img width="943" alt="image" src="https://user-images.githubusercontent.com/98637739/222257318-2b77a528-6c80-40e7-9bdd-7eab9f9eed64.png">

chatGPT의 API를 통해 질문을 받습니다.

<img width="941" alt="image" src="https://user-images.githubusercontent.com/98637739/222258456-078951da-151e-470f-9351-6516dfe780d4.png">

chatGPT의 API를 이용해 질문에 대한 피드백을 받습니다. 

(50 글자 이내의 데모 API만 사용이 가능해 Rigth, Wrong만 판별합니다)

## Oauth 구현

<img width="945" alt="Oauth" src="https://user-images.githubusercontent.com/98637739/222728641-e4602057-2aa4-4c4d-959d-a83532fcf48e.png">
  
간편하게 로그인할 수 있게 Oauth를 구현 했습니다.

## 북마크 관리

<img width="946" alt="image" src="https://user-images.githubusercontent.com/98637739/222255428-0185660e-355d-4308-bcdf-07c7eefa9966.png">

<img width="947" alt="image" src="https://user-images.githubusercontent.com/98637739/222255874-ddf03967-dab2-4dca-aed4-c73ed722b3d7.png">
  
북마크를 분류하는 서비스를 유저 친화적으로 구현하기 위해 노력 했습니다.

## 북마크 알람

<img width="944" alt="image" src="https://user-images.githubusercontent.com/98637739/222256189-5a88e3f9-41ba-455a-ac2b-38d7b480b210.png">
  
나중에 보기로 하고 잊어비리는 북마크가 없도록 알람 서비스를 구현 했습니다.

## 북마크 공유 피드

<img width="945" alt="image" src="https://user-images.githubusercontent.com/98637739/222268898-38197cd4-a9d5-4cd0-a168-5d85bea4c429.png">
  
좋은 포스트들을 공유할 수 있도록 피드를 만들었습니다.

피드는 Open Graph를 가져와서 보여줍니다.
  
## 반응형 웹 구현

<img width="619" alt="1" src="https://user-images.githubusercontent.com/98637739/222781341-31840076-4f02-4681-8434-0f160c14c044.png">

<img width="619" alt="2" src="https://user-images.githubusercontent.com/98637739/222781393-993ce5ba-2da9-4015-8ffe-ba34e2a1f2ac.png">

모바일 환경에서 이용할 수 있도록 반응형 웹으로 서비스를 구현 했습니다.

---

# 개발환경

## Backend: Nest.js (9.0.0)

- Database: MySql (3.1.2)

- DB Validation: Joi (17.7.1)

- ORM: TypeORM (0.3.12)

- Login: Json Web Token (passport-jwt 4.0.1)

- Encrypt: Bcrypt (5.0.0)

- Logger: Winston logger (3.8.2)

- Security: Helmet (6.0.1)

- Test: Jest (29.3.1)

## Frontend: React.js (18.2.0)

- bootstrap (5.2.2)

- react-bootstrap (2.7.0)

- axios (1.2.1)

---

# ERD

<img width="485" alt="image" src="https://user-images.githubusercontent.com/98637739/222259745-5799378a-6877-4560-8845-41c3375cba0d.png">

