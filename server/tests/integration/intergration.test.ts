import request from "supertest";
import { sequelize } from "../../models/index.js";
import app from "../../index.js";

/* Fake ORM */
beforeAll(async () => {
  await sequelize.sync();
});

/* Registration Test */
describe("POST /registration", () => {
  it("회원가입", (done) => {
    request(app)
      .post("/api/user/registration")
      .send({
        email: "temp@example.com",
        password: "temp",
        nick: "temp",
      })
      .expect(200, done);
    // ststus 200을 반환하고 종료
  });
});

/* Login Test1 */
describe("POST /login", () => {
  const agent = request.agent(app);

  beforeAll((done) => {
    /* 이미 로그인된 상황 연출 */
    agent
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "temp",
      })
      .end(done);
  });

  it("Already loggedin", (done) => {
    agent
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "temp",
      })
      .expect(401, { Error: "Already loggedin" })
      // { Error: "Already loggedin" } 반환하고 종료
      .end(done);
  });
});

/* Login test2 */
describe("POST /login", () => {
  it("user is not registered", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "NotRegisterd@example.com",
        password: "temp",
      })
      .expect(401, { Error: "user is not registered" })
      // { Error: "user is not registered" } 반환하고 종료
      .end(done);
  });

  it("login", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "temp",
      })
      .expect(200, done);
    // status 200 반환하고 종료
  });

  it("password do not match", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "1111",
      })
      .expect(401, { Error: "password do not match" })
      // 401 인증 실패
      // { Error: "password do not match" } 반환하고 종료
      .end(done);
  });
});

/* Logout Test */
describe("GET /logout", () => {
  it("unloggedin", (done) => {
    request(app)
      .post("/api/user/logout")
      .expect(403, { Error: "Login required" })
      .end(done);
    // 403 금지됨
    // proxy로 분리되어 있기 때문에 redirect url 만들어주지 않고
    // 모달창으로 에러 메시지 전달
    // status = 403, { Error: "Login required" } 반환하고 종료
  });

  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "temp",
      })
      .end(done);
  });

  it("logout", (done) => {
    agent
      .post("/api/user/logout")
      .expect(200)
      // 200코드 전달 이후 end()
      .end(done);
  });
});

/* Box Create */
// describe("POST /login", () => {
//   const agent = request.agent(app);
//   beforeEach((done) => {
//     agent
//       .post("/api/user/login")
//       .send({
//         email: "temp@example.com",
//         password: "temp",
//       })
//       .end(done);
//   });

//   it("POST /box", (done) => {
//     agent
//       .post("/api/box")
//       .send({
//         box: "temp_box",
//         img: "/img/default",
//         UserId: 1,
//       })
//       .expect(302, done);
//   });
// });

/* Box */
/*
describe("POST /login", () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/api/user/login")
      .send({
        email: "temp@example.com",
        password: "temp",
      })
      .end(done);
  });

  it("POST /box", (done) => {
    agent
      .post("/api/box")
      .send({
        box: "temp_box",
        img: "/img/default",
        UserId: 1,
      })
      .expect(302, done);
  });

  it("Delete /box/delete", (done) => {
    agent
      .delete("/api/box/delete")
      .send({
        img: "/img/default",
        id: 1,
      })
      .expect(302, done);
  });
});
*/

afterAll(async () => {
  await sequelize.sync({ force: true });
});