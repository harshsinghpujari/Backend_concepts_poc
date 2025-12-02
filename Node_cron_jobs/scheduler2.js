/**
 * Creating a JOB to check the status of invoices and if status is paid we archive the record
*/

import cron from 'node-cron';
import invoices from './data/invoices.json' with {type: 'json'};
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const archiveInvoicesTask = () => {

  console.log("Running the archiving Task :", Date.now());
  try {
    const paidInvoices = invoices.filter((item) => {
      return item.status==="paid";
    });
   
    if(paidInvoices.length > 0) {
      paidInvoices.forEach((item) => {
      invoices.splice( 
      invoices.findIndex((e) => e.status === item.status)
      ,1
      );
    });

    fs.writeFileSync(
      path.join(__dirname, "./", "data", "invoices.json"), JSON.stringify(invoices),
      "utf-8"
    );
       
    console.log("paid Invoices: ", paidInvoices);

    fs.writeFileSync(
      path.join(__dirname, "./", "data", "archive.json"),
      JSON.stringify(paidInvoices),
      "utf-8"
    );
    }
  } 
  catch (error) {
    console.log("err: ", error);  
  }
  console.log("Ending the archiving task"); 
};

cron.schedule('*/30 * * * * *',archiveInvoicesTask);