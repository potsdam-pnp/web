{ buildNpmPackage, nodejs, card-metadata-json, card-images, lib }:

buildNpmPackage rec {
  pname = "frontend";
  version = "0.1.0";

  base = "/web";
  dontNpmInstall = true;

  CARDS_METADATA_JSON_FILE = card-metadata-json;
  CARDS_IMAGE_FOLDER = card-images;

  src = ./frontend;

  postPatch = ''
    mkdir dependencies
    ln -s $CARDS_METADATA_JSON_FILE dependencies/card-metadata.json
    ln -s $CARDS_IMAGE_FOLDER dependencies/card-images
  '';

  npmDepsHash = "sha256-gPWKEjG4jdMW8TvmzsuXBSpqkea/WImo8NdoAAGIUbY=";
}
