import config from '../config';

import ip from 'ip';
import colors from 'colors/safe';
import Express from 'express';

let app = Express();

/* Run */
console.log(colors.blue.bold(`Run express server..`));
app.listen(config.expressPort, () => {
  console.log(colors.green.bold(`Server is running`));
  console.log(colors.green.bold(`Server address:`), colors.red.bold(`${config.serverAddress}`));
  console.log(colors.green.bold(`Client address:`), colors.red.bold(`http://${ip.address()}:${config.expressPort}\n`));
});
