import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

// import cors from 'cors';

// const corsConfig = {
// origin: "*",
// credential: true,
// methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.options("", cors(corsConfig));
//
// app.use(cors(corsConfig));

async function server() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`server running on port ${config.port}⚡`);
    });
  } catch (err) {
    console.log(err);
  }
}

server();
