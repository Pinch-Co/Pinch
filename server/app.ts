const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`This app is now listening at http://localhost:${port}`);
});
