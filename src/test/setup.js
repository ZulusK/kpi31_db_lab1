const debug = require('debug')('app:setup');

module.exports=async function () {
// Call your initialization methods here.
  if (!process.env.TEST_SETTUPED) {
    await setup();
  }
  // @ts-ignore
  process.env.TEST_SETTUPED = true;
}

function setup() {
  debug('setupped');
}
