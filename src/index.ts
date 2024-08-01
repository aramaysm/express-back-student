require('dotenv').config();

import 'reflect-metadata';
import { myDataSource } from "./ormconfig"
import app from './configs/express.config';

const PORT = process.env.PORT_SERVER || 5000;

const connect = async () => {
  try {
    myDataSource
    .initialize().then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  }) // Run all migrations
   
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (e) {
    console.log(`The connection to database was failed with error: ${e}`);
  }
}

connect();