// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { spawn } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const python = spawn("python", ["scripts/script.py", "node.js", "python"]);

  let dataToSend = "";

  // python.stdout.on("data", function (data) {
  //   console.log("Pipe data from python script ...");
  //   dataToSend = data.toString();
  //   console.log(dataToSend);
  // });

  // python.stderr.on("data", (data) => {
  //   console.error(data.toString());
  // });

  for await (const data of python.stdout) {
    console.log(data.toString());
    dataToSend += data.toString();
  }

  // python.on("exit", (code) => {
  //   console.log(`child process close all stdio with code ${code}`);
  //   // return res.status(200).send({ data: dataToSend });
  // });

  return res.status(200).send({ data: dataToSend });
}
