{ buildNpmPackage, nodejs }:

buildNpmPackage rec {
  pname = "frontend";
  version = "0.1.0";

  base = "/web";

  src = ./frontend;
  npmDepsHash = "sha256-nesHQ2mnTHmEQRY1cjFwlpmjfdU/UVXrSZxCjwIaJ5Q=";
}
