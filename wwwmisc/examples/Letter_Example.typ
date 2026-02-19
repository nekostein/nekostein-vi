#import "/latexlib/ns-letter2.typ": *
#show: docinit



#let main_sig = letter_sig[
  Best regards, \ Neruthes

  #image(width: 35mm, "/.miscpic/neruthes-sigalt1.png")

  #set text(size: 9 * kp)
  ~ \
  President\
  Nekostein
]
#let my_lipsum = for itr in range(14, 18) { par(lorem(110 + itr)) }



#make_letter[
  #letter_to[
    Mr. John Appleseed\ 1 Infinite Loop\ Cupertino\ CA 95014\ USA
  ]

  #letter_from[Neruthes\ Nekostein\ PO Box 55555\ Longyearbyen, 9170\ SVALBARD]

  Hi John, \ ~

  Thanks for writing in.
  We have studied the location options you mentioned and many of them appear to be convincing.

  Among all options, we are particularly interested in Peace Hammer, the coffee shop in Vancouver.
  Please find the preliminary event plan document in attachments.
  We will be happy to discuss details with the business owner.

  #my_lipsum

  #main_sig
]



#make_letter(is_wide: false)[
  // #letter_to[
  //   Mr. John Appleseed\ 1 Infinite Loop\ Cupertino\ CA 95014\ USA
  // ]

  #letter_from[
    #set align(left)
    #header_kv_pairs([Subject], [Re: Meetup event location options], [From], [Neruthes], [To], [John Appleseed])
  ]

  Hi John, \ ~

  Thanks for writing in.
  We have studied the location options you mentioned and many of them appear to be convincing.

  Among all options, we are particularly interested in Peace Hammer, the coffee shop in Vancouver.
  Please find the preliminary event plan document in attachments.
  We will be happy to discuss details with the business owner.

  #my_lipsum

  #main_sig
]
