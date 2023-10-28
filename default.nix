{ buildNpmPackage, nodejs, card-metadata-json, card-images, lib, pf2e-cards-rev }:

buildNpmPackage rec {
  pname = "frontend";
  version = "0.1.0";

  base = "/web";
  dontNpmInstall = true;

  CARDS_METADATA_JSON_FILE = card-metadata-json;
  CARDS_IMAGE_FOLDER = card-images;
  PF2E_CARDS_REV = pf2e-cards-rev;

  src = ./frontend;

  postPatch = ''
    mkdir dependencies
    ln -s $CARDS_METADATA_JSON_FILE dependencies/card-metadata.ts
    ln -s $CARDS_IMAGE_FOLDER dependencies/card-images
    echo "export default \"$PF2E_CARDS_REV\"" > dependencies/revision.ts
  '';

  npmDepsHash = "sha256-jWPTLnVxZe3KVMVQcUq0GUiiiyC+pj59/KSAybCDL3w=";
}
