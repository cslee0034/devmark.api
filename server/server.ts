import app from "./index.js";

/* Listen */
app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
  });
  