const express = require('express');
const path = require('path');

const port = 3000;

// eslint-disable-next-line no-undef
test('server can start', () => {
  const app = express();
  let success;

  app.use('/', express.static(path.join(__dirname, '../public')));

  const server = app.listen(port, (err) => {
    if (err) {
      success = false;
    } else {
      success = true;
    }

    // eslint-disable-next-line no-undef
    expect(success).toBe(true);
    server.close();
  });
});
