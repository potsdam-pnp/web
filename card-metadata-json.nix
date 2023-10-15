{ runCommand, cards, nodejs, writeText }:

runCommand "pf2e-card-metadata.json" {
  metadataFile = "${cards}/metadata.txt";
  program = writeText "metadata-to-json.js" ''
    const fs = require("fs").promises;
    async function main() {
      const content = await fs.readFile(process.argv[2], "utf8");
      let started = false;
      process.stdout.write("{");
      for (const line of content.split("\n")) {
        const index = line.indexOf("=");
        const first = line.substring(0, index);
        const second = line.substring(index+1);
        if (first === "page") {
          if (started) process.stdout.write("},");
          started = true;
          process.stdout.write(second);
          process.stdout.write(":{");
        } else {
          process.stdout.write(JSON.stringify(first.substring(1)));
          process.stdout.write(":");
          process.stdout.write(JSON.stringify(second));
        }
      }
      process.stdout.write("}}");
    }
    main();
  '';
  node = "${nodejs}/bin/node";
} ''
  $node $program $metadataFile > $out
''