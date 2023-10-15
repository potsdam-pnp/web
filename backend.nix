{ buildNpmPackage, nodejs }:

buildNpmPackage rec {
  pname = "pf2e-cards-backend";
  version = "0.1.0";

  src = ./backend;
  npmDepsHash = "sha256-nesHQ2mnTHmEQRY1cjFwlpmjfdU/UVXrSZxCjwIaJ5Q=";
}
