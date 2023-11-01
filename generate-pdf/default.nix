{ texlive, stdenv, lib, runCommand, cards, pages }:

stdenv.mkDerivation {
  name = "cards.pdf";
  nativeBuildInputs = [(texlive.combine { inherit (texlive) scheme-basic koma-script xetex latexmk pdfpages pdflscape; })];

  src = runCommand "our-cards.tex" { 
    inherit pages;
  } ''
    echo "\documentclass[paper=a4]{scrartcl}" > $out
    echo "\usepackage{pdfpages}" >> $out
    echo "\begin{document}" >> $out
    echo "\includepdf[pages={$(cat $pages)},nup=3x3,noautoscale,frame]{cards}" >> $out
    echo "\end{document}" >> $out
  '';

  unpackPhase = ''
    cp $src our-cards.tex
    ln -s ${cards}/cards.pdf .
  '';

  buildPhase = ''
    latexmk -xelatex our-cards.tex
  '';

  installPhase = ''
    cp our-cards.pdf $out
  '';
}