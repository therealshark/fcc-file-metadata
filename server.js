const Koa = require('koa');
const Router = require('koa-better-router');
const multer = require('koa-multer');

(async () => {
  const router = Router().loadMethods();
  const upload = multer();
  const app = new Koa();
  
  router.post("/analyse-file", upload.single("file"), async ctx => {
    ctx.body = {size: ctx.req.file.size};
  });
  
  router.get("/", async ctx => {
    ctx.body = `
<html>
<head><title>Metadata analyser</title></head>
<body>
<h1>Metadata analyser</h1>

<form method="post" action="/analyse-file" enctype="multipart/form-data">
  <label>Choose a file to analyse<br>
    <input name="file" type="file" size="50" accept="*"> 
  </label> 
  <br><br>
  <button>Analyse</button>
</form>

</body>
</html>
`;
  });
  
  app.use(router.middleware());
  
  app.listen(process.env.PORT);
  
})();