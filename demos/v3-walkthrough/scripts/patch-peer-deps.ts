import rimraf from "rimraf";
import path from "path";

const packagesToPatch = [
  "@polywrap/react"
];

function main () {
  for (const packageToPatch of packagesToPatch) {
    rimraf.sync(
      path.join(
        __dirname,
        "../node_modules",
        packageToPatch,
        "node_modules/@polywrap"
      )
    );
  }
}

main();
