#set page(paper: "a4", margin: 0pt)
#set text(font: "Inter", size: 13pt, number-width: "tabular", stretch: 100%)


#let make_card(date, fullname, qualification, barcode) = {
  let real_content = context [
    #set align(left)
    #image(width: 11mm, "../_dist/wwwmisc/avatar/Nekostein-avatar.white_black.rounded.png")
    // #image(width: 70%, "../_dist/wwwmisc/logocomb/Nekostein-logocombH.black.png")

    #v(1fr)

    #par(leading: 0.52em)[#text(size: 28pt)[*OFFICE \ ONE-DAY \ PASS*]]

    // #text(size: 28pt)[**]

    #v(5mm)


    #box(width: 100%)[
      *#fullname* \
      #qualification \
      #date
    ]

    #v(-11mm)

    #text(font: "Libre Barcode 128", size: 40pt)[\*#barcode\*]
  ]

  align(center, rotate(90deg, reflow: true, box(width: 80mm, height: 120mm, inset: 10mm, stroke: none, real_content)))
}



#make_card("2025-08-10", "John Appleseed", "Guest", "20250810001")
