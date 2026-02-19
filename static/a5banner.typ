#page(
  width: 200mm,
  height: 150mm,
  fill: black,
  foreground: {
    place(center + horizon, box(image(
      width: 125mm,
      height: auto,
      "/_dist/libvi/logocomb/Nekostein-logocombH.white.png",
    )))
  },
  [~~~],
)


// ./make.sh static/a5banner.typ && DPI=600 gspdftopng _dist/static/a5banner.pdf
