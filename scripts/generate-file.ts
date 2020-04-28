import { writeFileSync } from "fs";
import { format } from "prettier";

export const generateFile = (filepath: string, content: string) => {
  const output = format(content, { filepath });
  writeFileSync(filepath, output);
};
