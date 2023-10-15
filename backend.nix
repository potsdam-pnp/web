{ buildNpmPackage, nodejs }:

buildNpmPackage rec {
  pname = "pf2e-cards-backend";
  version = "0.1.0";

  src = ./backend;
  npmDepsHash = "sha256-K3Q/imTWBpr97Q3djh3NA1mSQ1usucPYqLZEyokhhJA=";
}
