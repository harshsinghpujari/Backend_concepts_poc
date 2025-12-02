// /**
//  * HouseKeeping of records older than 180 days
//  */

// import cron from 'node-cron';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import archive from './data/archive.json' with {type: "json"};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const houseKeepingTask = () => {
//   console.log("Running house keeping task: ", new Date());

//   try {
//     archive.map((item, index) => {
//       const presentDate = new Date().getTime();
//       const recordDate = new Date().getTime();
//       console.log("The no of days: ", Math.floor((presentDate - recordDate) / (1000 * 60* 60* 24))
//     );
//     })
//   } catch (error) {
//     console.log("error: ", error);
    
//   }

//   console.log("Ending house keeping task");
  
// };

// cron.schedule('* * * * * *',houseKeepingTask);