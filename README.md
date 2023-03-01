# Dev-Mark 개발 일지

https://kaput-geometry-436.notion.site/d8230eef4ced4582a6884d3d552734b0?v=0257760f0464402ca87762d4646d063c

# Project : 북마크 관리 + ChatGPT를 이용한 면접 서비스 | 22.01 ~ 22.03

## ChatGPT 기술 면접

<img width="943" alt="image" src="https://user-images.githubusercontent.com/98637739/222257318-2b77a528-6c80-40e7-9bdd-7eab9f9eed64.png">

chatGPT의 API를 통해 질문을 받습니다.

<img width="941" alt="image" src="https://user-images.githubusercontent.com/98637739/222258456-078951da-151e-470f-9351-6516dfe780d4.png">

chatGPT의 API를 이용해 질문에 대한 피드백을 받습니다. 

(50 글자 이내의 데모 API만 사용이 가능해 Rigth, Wrong만 판별합니다)

## 북마크 관리

<img width="946" alt="image" src="https://user-images.githubusercontent.com/98637739/222255428-0185660e-355d-4308-bcdf-07c7eefa9966.png">

<img width="947" alt="image" src="https://user-images.githubusercontent.com/98637739/222255874-ddf03967-dab2-4dca-aed4-c73ed722b3d7.png">

## 북마크 알람

<img width="944" alt="image" src="https://user-images.githubusercontent.com/98637739/222256189-5a88e3f9-41ba-455a-ac2b-38d7b480b210.png">


## 북마크 공유 피드

<img width="945" alt="image" src="https://user-images.githubusercontent.com/98637739/222257110-4ae35cd9-33e5-44a0-8fa0-34703c167e50.png">

---

# 서비스 소개

개발 공부를 하며 점점 늘어나는 북마크를 효율적으로 관리하고 싶다는 생각으로 서비스를 만들었습니다.

나중에 보기로 하고 다시 보지 않은 북마크들이 생기지 않도록 알람 기능을 추가하였습니다.

좋은 개발 관련 포스트를 다른 사람과 공유할 수 있는 기능이 있다면 더욱 좋은 서비스가 될 수 있을것 같아 피드 기능을 추가 했습니다.

기술 면접을 준비하면서 질문을 통해 더 많은 것들을 배운다는 것을 알게 되었습니다.

최근 성능을 인정받고 있는 ChatGPT의 데모 API를 이용해 기술면접에 대한 질문을 받고 그에 대한 대답을 피드백 받을 수 있도록 서비스를 만들었습니다. (데모 API이기 때문에 50글자 제한이 있습니다)

---

# 테스트 코드 작성

Unit Test를 작성해가며 Controller와 Service의 유효성을 테스트 했습니다.

![image](https://user-images.githubusercontent.com/98637739/222253623-c5f99914-fd06-4716-910b-43c5fc1590c4.png)


---

# Architecture

![image](https://user-images.githubusercontent.com/98637739/222233439-1f6401dc-c393-4693-afca-22e655cd3e95.png)

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

