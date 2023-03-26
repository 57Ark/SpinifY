// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { PythonShell } from "python-shell";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scriptPath = path.join(process.cwd(), "scripts");

  let dataToSend = "";
  const results = await PythonShell.run("script.py", {
    mode: "text",
    pythonPath: "python",
    pythonOptions: ["-u"],
    scriptPath,
    args: ["node.js", "python"],
  });
  // const python = spawn("python", [scriptPath, "node.js", "python"]);

  // for await (const data of python.stdout) {
  //   console.log(data.toString());
  //   dataToSend += data.toString();
  // }
  for await (const data of results) {
    console.log(data.toString());
    dataToSend += data.toString();
  }

  return res.status(200).send({ data: dataToSend });
}
