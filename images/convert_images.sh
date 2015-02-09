for f in *.svg
do
  /Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png $f.png $f
done
