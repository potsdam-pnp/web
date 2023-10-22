{ buildNpmPackage, nodejs, card-metadata-json, card-images }:

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

  npmDepsHash = "sha256-LaFzEhXQhwlNJkoZajUAglRMZJBTdwjuViobwhT6J5I=";
}
