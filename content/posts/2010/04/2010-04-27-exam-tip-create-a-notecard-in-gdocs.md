---
coverImageUri: ""
title: "Exam Tip: Create a Notecard in GDocs"
datetime: "2010-04-27T13:13:10.000Z"
categories: "technology"
tags: "css,google docs"
---

For my Anatomy & Physiology class, we're allowed to use 3 x 5 notecards on our exams. The professor doesn't care how we make the cards or what we put on the cards. I decided to take his online study guides and condense them using Google Docs.

[![](http://assets.brandonmartinez.com/brandonmartinez/2010/04/cramming-final-result-575x352.png "Notecard: Final Result")](http://assets.brandonmartinez.com/brandonmartinez/2010/04/cramming-final-result.png)

Making this is really simple. Create a new Google Doc, and modify the CSS (in the menu, select Edit, then Edit CSS). Copy this into the dialog:

\[css\]\*, p, h1, h2, h3, h4, h5, li, blockquote { font-family: arial,sans-serif; font-size: 8px; text-align: justify; line-height: 10px; } @page { size: 5in 3in !important; margin: .125in !important; }\[/css\]

Next, copy/paste your information into the Google Doc:

[![](http://assets.brandonmartinez.com/brandonmartinez/2010/04/cramming-writing-process-575x451.png "Notecard: Editing in Google Docs")](http://assets.brandonmartinez.com/brandonmartinez/2010/04/cramming-writing-process.png)

If you don't see something similar, you may have to clean the document up a bit. Go to Edit in the menu, then select Edit HTML. Make sure your paragraphs and such are surrounded by the proper <p> tags. Feel free to remove any odd styling tags, such as <font> or <span>. This is my finished result:

\[html\]<p><b>Chapter 16 Digestion: </b>Know Functs of the dig system. Teeth; adult (32), deciduous (primary “baby”)(20), know the Functs of the different kinds of teeth (which are for cutting, tearing, &amp; grinding). Functs of the lvr. Different ways fats are broken down. Where do we absorb most of the nutrients of ingested food (sm. intestine)? Stomach; what is the semi-fluid mixture of food stuff &amp; stomach secretions, movement of food through stomach, regulation of stomach secretion (phases), pH level in stomach. Small intestines (know the parts, &amp; translations) Cholesterol; LDL’s vs HDL’s (good vs. bad). Vermiform appendix (worm-like appendage) — the ‘appendix’ — new research indicates that it does have a job replenishing the natural bacteria (flora) w/in the large intestine after illness or use of antibiotics<b>&nbsp;Chapter 17 Nutrition, Metabolism, &amp; Body Temperature Regulation&nbsp;</b>What is the most efficient way for the body 2 store energy long-term? What is the net gain of ATP through glycolysis? 2 Know incomplete vs. complete proteins: rice, beans; meat. Know about aerobic respiration; aerobic means it utilizes oxygen, kicks out 36 ATP, occurs in mitochondria (powerhouse). Body temp; know hypothalamus’ role in regulating body temp — anterior portion detects raise in body temp. (increase sweating, dilate skin blÃ¼d vessels, take off jacket etc.), posterior portion detects drop in body temp. (causes shivering, constrict skin blÃ¼d vessels, tells you 2 put a coat on etc.) Know Glycogen; what molecules are bonded together 2 form it: short term energy, fat for long-term. Calories in a pound of fat: 3,500.&nbsp;<b>Review Ch.18 urnry System:&nbsp;</b>Urine produced in kdnys. Stored in bladder. Micturition reflex: stretch on bladder 2 urinate. Know the parts of the urnry system (kid, ureter, bladder, urethra) Know the structures of the kdny (including the structures of nephrons, millions per kdny) What is the Functal unit of the kdny (nephron). Make sure you can describe what effects different Hrmns would have on blÃ¼d pressure (ADH: anti-direuretic, ANH: atrial-naturetic horm., Renin). Where do solutes &amp; H20 that are reabsorbed from the nephron’s tubules/loop of Henle go (peritubular capillaries)? Know the relationship between blÃ¼d volume &amp; blÃ¼d pressure (up goes up; down goes down). What kind of cells make up the wall of Bowman’s capsule (simple squam), Proximal &amp; Distal tubules (simple cuboid), loop of Henle (simple squam), collecting ducts (simple cuboid), ureters (trans), bladder (trans).&nbsp;<b>Review Ch. 19 Reproductive:</b>&nbsp;Spermatogenesis: creation of sperm. Where does it take place? Seminiferous Tubule. Where are sperm stored (for ~6 weeks)? Epididimous. Know organs: which nourish (seminal ves), which activate (prostate), which lubricate ? What structure encloses, &amp; protects the testes, &amp; keeps them cooler than body temperature (scrotum)? What is a gamete (egg)? How many chromosomes does a gamete have (23)? Know the difference between meiosis (four daughter cells, 23 chrom) &amp; mitosis (two daughter cells, 46 chrom). Where does fertilization occur (fallop tube)? Where does a developing fetus stay 2 be protected &amp; sustained (uterus)? Once an oocyte is ‘chosen’, know the steps leading 2 ovulation. Know phases of menstruation, including first episode (menarchy). Hrmns; know which ones come from which structures &amp; target tissues (examples; estrogen, progesterone, testosterone, GnRH, LH, FSH, Inhibin)</p>\[/html\]

Once you've done all of this, you should be able to go to File in the menu, then Print Preview to see what your notecard will look like. Once you've finished typing your notes, just print the card and you're ready for your exam.

## A few more tips

- Tweak the CSS to fit your needs. If you are only allowed one single-sided notecard, try adjusting the line-height or letter-spacing properties to cram as much info as you need
- If you still need more space, try this. Do a Find & Replace for common words that can be abbreviated. For example, _to_ can change to _2_, _with_ to _w/_, _and_ to _&_, and so on. If you look at my example, you'll notice I take some of the larger words and remove vowels (but still keep them understandable).
- If things still aren't working right, check the HTML! Just scanning it over can sometimes reveal common problems.
