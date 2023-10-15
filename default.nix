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
    ln -s $CARDS_METADATA_JSON_FILE src/js/card-metadata.json
  '';

  npmDepsHash = "sha256-nesHQ2mnTHmEQRY1cjFwlpmjfdU/UVXrSZxCjwIaJ5Q=";
}
