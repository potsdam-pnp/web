{
  description = "generate-pdf";
    inputs = {
      nixpkgs.follows = "pf2e-cards/nixpkgs";
      flake-utils.follows = "pf2e-cards/flake-utils";
      pf2e-cards.url = "github:potsdam-pnp/pf2e-cards";
      pages = {
        flake = false;
        type = "file";
        url = "https://raw.githubusercontent.com/potsdam-pnp/web/main/generate-pdf/pages";
      };
  };

  outputs = { self, nixpkgs, flake-utils, pf2e-cards, pages }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
          cards = pf2e-cards.packages.${system}.cards; in {
      packages.default = pkgs.callPackage ./. { inherit cards pages; };
    });
}