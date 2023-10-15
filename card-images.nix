{ poppler_utils, cards, runCommand }:

runCommand "pf2e-card-images" {
  nativeBuildInputs = [ poppler_utils ];
  cardsPdf = "${cards}/cards.pdf";
} ''
  pageNumber=$(pdfinfo $cardsPdf | grep Pages | sed 's/[^0-9]*//')
  mkdir $out
  for i in $(seq 1 $pageNumber); do
    echo pdftoppm -f $i -l $i -png $cardsPdf
    pdftoppm -f $i -l $i -png $cardsPdf > $out/$i.png
  done
''