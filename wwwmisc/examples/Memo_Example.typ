#import "/latexlib/ns-letter2.typ": *
#show: docinit




#make_letter[
  #make_header([Document Title], header_kv_pairs([Author], [Neruthes], [Date], [2026-01-01]))

  = Some Section
  #par(lorem(110))
  == Subsection
  #par(lorem(200))
  == Subsection
  #par(lorem(200))

  = Another Section
  #par(lorem(110))
  == Subsection
  #par(lorem(200))
  == Subsection
  #par(lorem(200))
]

