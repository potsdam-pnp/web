{ buildNpmPackage, nodejs }:

buildNpmPackage rec {
  pname = "web";
  version = "0.1.0";

  dontNpmBuild = true;

  src = ./src;
  npmDepsHash = "sha256-mt9NhjHfOSvUxv+BviTW3UbVvcetVBIwAcpYZeEkW5U=";
}

