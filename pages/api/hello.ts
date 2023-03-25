// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { spawn } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const python = spawn("python3", [
    process.cwd() + "/scripts/script.py",
    "node.js",
    "python",
  ]);

  let dataToSend = "";

  for await (const data of python.stdout) {
    console.log(data.toString());
    dataToSend += data.toString();
  }

  return res.status(200).send({ data: dataToSend });
}
