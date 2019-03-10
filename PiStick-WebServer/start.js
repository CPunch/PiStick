const app = require('./app');

const server = app.listen(80, () => {
  console.log(`PiStick is running on port ${server.address().port}`);
});

