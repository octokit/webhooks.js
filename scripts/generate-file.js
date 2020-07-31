const { writeFileSync } = require("fs");
const { format } = require("prettier");

const generateFile = (filepath, content) => {
  const output = format(content, { filepath });
  writeFileSync(filepath, output);
};

exports.generateFile = generateFile;
