#import "/latexlib/ns-letter2.typ": *
#show: docinit

#let left_col(content) = {}

#make_letter[
  #letter_to[
    Mr. John Appleseed\ 1 Infinite Loop\ Cupertino\ CA 95014\ USA
  ]

  #letter_from[Neruthes\ Nekostein\ PO Box 55555\ Longyearbyen\ Svalbard]

//   #align(right, [Nekostein Office\ PO Box 55555\ Longyearbyen\ Svalbard])
//   #v(10mm)

//   #header_kv_pairs([Subject], [Re: Meetup event location options], [From], [Neruthes], [To], [John Appleseed])
//   #v(10mm)

  Hi John, \ ~

  Thanks for writing in.
  We have studied the location options you mentioned and many of them appear to be convincing.

  Among all options, we are particularly interested in Nakamura & Co, the coffee shop in Vancouver.
  Please find the preliminary event plan document in attachments.
  We will be happy to discuss details with the business owner.

  #for itr in range(44, 55) { par(lorem(300+itr))}

  #letter_sig[
    Best regards, \ Neruthes

    #image(width: 35mm, "/.miscpic/neruthes-sigalt1.png")

    #set text(size: 9pt)
    ~ \
    President of Nekostein
  ]

]
