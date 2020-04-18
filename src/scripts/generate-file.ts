import fs from "fs";
import prettier from "prettier";

export const generateFile = (filepath: string, content: string) => {
  const output = prettier.format(content, { filepath });
  fs.writeFileSync(filepath, output);
};
