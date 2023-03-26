// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { execSync } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const scriptPath = path.join(process.cwd(), "scripts/script.py");

  // const dataToSend = "";
  // const results = await PythonShell.run("script.py", {
  //   mode: "text",
  //   pythonPath: "python",
  //   pythonOptions: ["-u"],
  //   scriptPath,
  //   args: ["node.js", "python"],
  // });
  // const python = spawn("python", [scriptPath, "node.js", "python"]);
  // const python = spawn(`python -c "print(2 + 3)"`, [""]);
  const pythonProcess = execSync('python -c "print(2 + 3)"');

  console.log(pythonProcess.toString());

  // for await (const data of python.stdout) {
  //   console.log(data.toString());
  //   dataToSend += data.toString();
  // }
  // for await (const data of results) {
  //   console.log(data.toString());
  //   dataToSend += data.toString();
  // }

  return res.status(200).send({ data: pythonProcess.toString() });
}
