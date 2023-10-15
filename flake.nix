{
  description = "website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-23.05";
    flake-utils.url = "github:numtide/flake-utils";
    pf2e-cards.url = "github:potsdam-pnp/pf2e-cards";
  };

  outputs = { self, nixpkgs, flake-utils, pf2e-cards }:
    flake-utils.lib.eachDefaultSystem (system: 
      let pkgs = nixpkgs.legacyPackages.${system};
          cards = pf2e-cards.packages.${system}.cards; in {
        packages = rec {
          card-metadata-json = pkgs.callPackage ./card-metadata-json.nix { inherit cards; };
          card-images = pkgs.callPackage ./card-images.nix { inherit cards; };
          frontend = pkgs.callPackage ./. { inherit card-metadata-json card-images; };
          backend = pkgs.callPackage ./backend.nix {};
          default = frontend;
        };
    });
}