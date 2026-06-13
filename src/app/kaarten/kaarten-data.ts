// Inhoud van de AI-gesprekskaarten. Bron: gecureerd uit een meervoudige
// generatie-/redactieronde, daarna handmatig in balans gebracht
// (duplicaten weggehaald, ontbrekende onderwerpen toegevoegd, vormverdeling
// gelijkmatiger). 6 thema's x 9 kaarten = 54 gesprekskaarten + 6 spelregels.

export type KaartType = "stelling" | "dilemma" | "open-vraag";
export type ThemaKey =
  | "eerlijk"
  | "werk"
  | "leren"
  | "vertrouwen"
  | "koers"
  | "mens";

export interface Thema {
  key: ThemaKey;
  naam: string;
  kleur: string; // accentkleur (suit)
  tint: string; // zachte achtergrond
  kicker: string; // korte ondertitel
}

export interface Kaart {
  id: string;
  nr: number; // volgnummer op de kaart
  thema: ThemaKey;
  type: KaartType;
  tekst: string;
  crux: string; // facilitator-note (achterkant)
  top?: boolean; // sterk als losse LinkedIn-post
}

export interface Spelregel {
  titel: string;
  tekst: string;
}

export const themas: Thema[] = [
  {
    key: "eerlijk",
    naam: "Eerlijk over AI",
    kleur: "#E8590C",
    tint: "#FBE3D4",
    kicker: "Transparantie, schijn en vertrouwen",
  },
  {
    key: "werk",
    naam: "Werk & productiviteit",
    kleur: "#4C8577",
    tint: "#DCEAE5",
    kicker: "Sneller werken, maar waarvoor?",
  },
  {
    key: "leren",
    naam: "Leren & vakmanschap",
    kleur: "#C98A1B",
    tint: "#F6E7C4",
    kicker: "Groeien of verleren",
  },
  {
    key: "vertrouwen",
    naam: "Klopt het wel?",
    kleur: "#2F6E78",
    tint: "#D5E6E6",
    kicker: "Kwaliteit, fouten en verantwoordelijkheid",
  },
  {
    key: "koers",
    naam: "Onze koers",
    kleur: "#B5532E",
    tint: "#F2DBCF",
    kicker: "Te veel, te weinig, en van wie is de winst?",
  },
  {
    key: "mens",
    naam: "Mens & betekenis",
    kleur: "#875A6B",
    tint: "#ECDCE2",
    kicker: "Wat blijft er van ons werk?",
  },
];

export const typeLabel: Record<KaartType, string> = {
  stelling: "Stelling",
  dilemma: "Dilemma",
  "open-vraag": "Open vraag",
};

// Korte werkvorm-hint per type, getoond bij de kaart online.
export const typeHint: Record<KaartType, string> = {
  stelling: "Eens of oneens? Laat iedereen kiezen, ook fysiek (kies een kant).",
  dilemma: "Wat zou jij doen? Eerst zelf, dan pas hardop.",
  "open-vraag": "Een rondje, ieder een eigen verhaal. Niet meteen reageren.",
};

export const kaarten: Kaart[] = [
  {
    id: "eerlijk-1",
    nr: 1,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Een tekst door AI laten schrijven en doen alsof het je eigen woorden zijn, is gewoon misleiding. Ook als ik het zelf af en toe doe.`,
    crux: `De tweede zin is de val: wie instemt erkent dat hij het zelf ook doet. Het gesprek gaat niet over of het mag, maar over de dubbele maat. Vraag door: wat is het verschil tussen wat jij doet en wat je die collega verwijt? Zit het in de mate van bewerken, in de pretentie, of houden we onszelf gewoon een uitzondering toe?`,
  },
  {
    id: "eerlijk-2",
    nr: 2,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Wij zouden als team standaard moeten vermelden wanneer iets met AI is gemaakt.`,
    crux: `Geschikt om mensen letterlijk naar een kant van de kamer te laten lopen. Voorstanders: transparantie en vertrouwen. Tegenstanders: een verplicht stempel maakt AI verdacht, terwijl niemand meldt dat hij Google of een rekenmachine gebruikte. De crux is of melden vertrouwen schept of juist een schuldlabel plakt op normaal gereedschap.`,
  },
  {
    id: "eerlijk-3",
    nr: 3,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Iemand die zegt: ik gebruik nooit AI, geloof ik tegenwoordig niet meer.`,
    crux: `Prikkelt het thema vertrouwen vanaf de andere kant: stiekem gebruik is zo wijdverbreid dat ontkenning ongeloofwaardig wordt. Legt bloot dat onuitgesproken normen een cultuur van kleine leugentjes maken. Vraag: als 'niemand zegt het maar iedereen doet het' de norm is, wie durft dan nog eerlijk te zijn over de grens van zijn eigen kunnen?`,
    top: true,
  },
  {
    id: "eerlijk-4",
    nr: 4,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Als een klant niet vraagt of we AI hebben gebruikt, hoeven we het ook niet uit onszelf te zeggen.`,
    crux: `Verschuift van interne collegialiteit naar de buitenwereld, waar geld en verwachtingen meespelen. Zwijgen is juridisch vaak prima, maar voelt het eerlijk als de klant denkt maatwerk te kopen? Onderscheid: betaalt iemand voor jouw uren, jouw oordeel, of voor een werkend resultaat? Daar hangt het antwoord aan.`,
  },
  {
    id: "eerlijk-5",
    nr: 5,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Je vermoedt dat je stagiair een opdracht volledig door AI heeft laten maken. Vraag je ernaar, dan ontkent diegene het. Wat doe je?`,
    crux: `De ijkcasus. Dwingt onderscheid tussen 'met AI' (waar precies?) en de kern: een stage gaat om leren, niet om output. Gaat het je om het AI-gebruik, om de ontkenning (de echte vertrouwensbreuk), of om wat de stagiair hier niet leert? Het ongemak: je gebruikt zelf waarschijnlijk ook AI, dus waar haal je het recht vandaan om streng te zijn?`,
    top: true,
  },
  {
    id: "eerlijk-6",
    nr: 6,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Je manager presenteert in een overleg een analyse als zijn eigen werk. Jij weet dat AI het grootste deel deed. Zeg je iets, en zo ja, tegen wie?`,
    crux: `Voegt machtsverhouding toe aan de transparantievraag. Dezelfde gedraging die bij een stagiair 'fout' heet, blijft bij een baas vaak onbesproken. Legt bloot dat onze eerlijkheidsnormen meebewegen met hierarchie. Vraag: geldt 'eerlijk over AI' alleen omhoog en zijwaarts, of ook als het je iets kan kosten?`,
  },
  {
    id: "eerlijk-7",
    nr: 7,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Een klant verbiedt AI in zijn opdracht. Jij weet dat je het met AI sneller en minstens zo goed kunt, en dat hij het verschil nooit zal zien. Houd je je aan zijn nee, of doe je wat volgens jou het beste resultaat geeft?`,
    crux: `De kern: respecteer je de autonomie van de klant over iets wat hij niet kan controleren, of je eigen oordeel over kwaliteit? 'Hij ziet het verschil toch niet' is precies het argument dat vertrouwen sloopt. Onderscheid: verbiedt hij een gereedschap, of koopt hij de zekerheid van mensenhanden? En als je zijn nee omzeilt zonder dat hij het merkt, voor wie doe je dat dan eigenlijk?`,
  },
  {
    id: "eerlijk-8",
    nr: 8,
    thema: "eerlijk",
    type: "open-vraag",
    tekst: `Wat heb je weleens door AI laten maken en als je eigen werk laten doorgaan, terwijl het eigenlijk niet klopte om dat zo te brengen?`,
    crux: `Vraagt naar een echt moment in plaats van een principe, en houdt het strak op het thema: niet wat je niet WILT maken (dat is mens-8), maar waar je de schijn van eigen werk hebt opgehouden terwijl het schuurde. Let op het verschil tussen 'iedereen doet dit' en oprecht ongemak achteraf. De plek waar iemand het toch deed verraadt waar zijn eerlijkheidsgrens in de praktijk ligt, niet in theorie.`,
  },
  {
    id: "eerlijk-9",
    nr: 9,
    thema: "eerlijk",
    type: "open-vraag",
    tekst: `Wanneer vind jij het juist prima om niet te vertellen dat er AI bij betrokken was, en wanneer voelt datzelfde zwijgen oneerlijk?`,
    crux: `Draait het thema om: niet 'wanneer stoorde het zwijgen van een ander', maar 'waar ligt mijn eigen grens tussen normaal gereedschap en misleiding'. Dwingt mensen twee concrete gevallen naast elkaar te leggen, waardoor het criterium zichtbaar wordt in plaats van het oordeel. Vraag door wat het verschil maakt: gaat het om wat de ander verwacht, om wat hij ervoor betaalt, of om hoe persoonlijk het is.`,
  },
  {
    id: "werk-1",
    nr: 10,
    thema: "werk",
    type: "stelling",
    tekst: `De tijd die ik met AI bespaar, gaat op aan nog meer werk, niet aan rustiger werken.`,
    crux: `Tijdwinst verdampt vaak in meer output in plaats van meer ruimte. Wie het eens is, voelt de tredmolen; wie het oneens is, heeft die ruimte teruggepakt of doet bewust minder. Trek het naar de kern: van wie is de bespaarde tijd eigenlijk, van jou of van de organisatie? En wie het oneens is: hoe lukt het je om die ruimte vast te houden?`,
    top: true,
  },
  {
    id: "werk-2",
    nr: 11,
    thema: "werk",
    type: "stelling",
    tekst: `Als ik een mail door AI laat schrijven en hem nauwelijks aanpas, is dat slim, ook als de ontvanger merkt dat het niet mijn woorden zijn.`,
    crux: `De toevoeging 'ook als de ontvanger het merkt' haalt de open deur eruit. Voor een standaard bevestiging boeit het niemand; bij een collega of klant kan een gladde, onpersoonlijke mail de relatie net beschadigen. De spanning: koop je efficiency met een beetje vertrouwen of warmte, en wanneer is die prijs het waard? Laat het team een geval noemen waarin het wel en waarin het niet kon.`,
  },
  {
    id: "werk-3",
    nr: 12,
    thema: "werk",
    type: "stelling",
    tekst: `Veel van wat wij 'productiever worden met AI' noemen is gewoon meer tekst produceren waar niemand om vroeg.`,
    crux: `Benoemt schijnproductiviteit: langere mails, uitgebreidere verslagen, meer documenten omdat het kan. De spanning: voelt het team dit ook, of vindt men dat de output echt beter is geworden? Vraag door naar iets concreets dat nu bestaat puur omdat AI het makkelijk maakte, en of iemand het zou missen als het weg was.`,
    top: true,
  },
  {
    id: "werk-4",
    nr: 13,
    thema: "werk",
    type: "stelling",
    tekst: `Een vergadering door AI laten samenvatten in plaats van zelf opletten maakt me een slechtere deelnemer.`,
    crux: `Prikkelt omdat de tool juist als handig wordt verkocht. Spanning tussen aanwezigheid en gemak: als de AI toch alles vastlegt, waarom nog scherp luisteren? Een minderheid vindt dat juist bevrijdend: meer ruimte om mee te denken. Trek het naar de vraag wat een vergadering oplevert behalve een verslag.`,
  },
  {
    id: "werk-5",
    nr: 14,
    thema: "werk",
    type: "stelling",
    tekst: `Sinds AI het simpele werk wegneemt, voelt een dag waarop ik weinig zichtbaar produceer als een verspilde dag.`,
    crux: `Raakt de onuitgesproken norm dat 'druk en zichtbaar bezig' gelijkstaat aan waardevol. Wie het eens is, voelt de prestatiedruk toenemen nu het makkelijke werk weg is; wie het oneens is, ziet juist ruimte voor denken, overleg en herstel. De crux: als AI de vulling weghaalt, durven we dan een dag zonder zichtbare output nog goed te noemen, of jaagt het ons naar meer? Vraag wat een 'goede werkdag' eigenlijk is geworden.`,
  },
  {
    id: "werk-6",
    nr: 15,
    thema: "werk",
    type: "dilemma",
    tekst: `Een teamlid levert in een dag werk in waar normaal een week voor staat, duidelijk met veel AI. De kwaliteit is prima. Een ander teamlid voelt zich er ongemakkelijk bij. Wat doe je?`,
    crux: `Dwingt een keuze tussen output belonen en het ongemak serieus nemen. Onder de oppervlakte: bestaat er een onuitgesproken norm over hoeveel inspanning werk hoort te kosten? En wat doet dit met de eerlijkheid van beoordelingen en werkdruk? Geen schoon antwoord: je kunt niet tegelijk de snelheid vieren en de twijfel wegwuiven.`,
  },
  {
    id: "werk-7",
    nr: 16,
    thema: "werk",
    type: "dilemma",
    tekst: `Je manager vraagt of je 'al veel tijd bespaart met AI'. Eerlijk gezegd valt het tegen: je raakt soms juist meer tijd kwijt aan controleren en bijsturen. Wat zeg je?`,
    crux: `Dwingt te kiezen tussen het eerlijke, genuanceerde antwoord en het verwachte succesverhaal. Onder de druk om AI als winst te presenteren verdwijnt vaak de waarheid dat het soms trager is. De crux: durft het team de kosten van AI hardop te benoemen, of houdt iedereen het rooskleurige verhaal in stand?`,
    top: true,
  },
  {
    id: "werk-8",
    nr: 17,
    thema: "werk",
    type: "open-vraag",
    tekst: `Welke taak heb je inmiddels zo aan AI overgelaten dat je niet meer zeker weet of je hem zelf nog goed zou kunnen?`,
    crux: `Verschuift van onschuldige gewoonte naar de ongemakkelijke vraag of er stilletjes een vaardigheid is weggelekt. De winst zit in de eerlijkheid: durft iemand toe te geven dat hij het zonder AI niet meer dunnetjes overdoet? Vraag door of dat erg is. Soms niet (je doet het toch nooit meer zelf), soms wel (het is je vak of je controlevermogen). Laat het verschil benoemen.`,
  },
  {
    id: "werk-9",
    nr: 18,
    thema: "werk",
    type: "open-vraag",
    tekst: `Denk aan de tijd die je deze week met AI bespaarde. Waar is die concreet heen gegaan: naar ander werk, naar meer van hetzelfde, of naar iets voor jezelf?`,
    crux: `Maakt de abstracte tijdwinst eindelijk concreet en persoonlijk, zonder de stelling van werk-1 te herhalen. De antwoorden verraden de echte cultuur: ging het naar meer output, naar de organisatie, of durfde iemand het voor zichzelf te houden (eerder weg, een wandeling, denkruimte)? Let op wie zich verontschuldigt voor 'tijd voor jezelf'. Daar zit de onuitgesproken norm. Vraag door of iemand die keuze bewust maakte of dat de tijd gewoon volliep.`,
  },
  {
    id: "leren-1",
    nr: 19,
    thema: "leren",
    type: "stelling",
    tekst: `Ik vertrouw inmiddels meer op AI dan op mijn eigen oordeel bij dingen die ik eigenlijk zelf zou moeten kunnen.`,
    crux: `Ongemakkelijke zelfonthulling. Onderscheid gezond uitbesteden van een sluipende afhankelijkheid. De crux: leunen op AI wordt pas riskant op het moment dat je een fout niet meer zelf herkent. Vraag wanneer iemand voor het laatst echt controleerde of het antwoord klopte.`,
  },
  {
    id: "leren-2",
    nr: 20,
    thema: "leren",
    type: "stelling",
    tekst: `Het zelf worstelen met een probleem is waardevoller dan het snelle antwoord van AI.`,
    crux: `Bewust dubbel: een serieuze minderheid vindt dit het romantiseren van inefficientie. Laat het gesprek gaan over wanneer worstelen blijft hangen en wanneer het puur tijdverlies is. Geldt dit voor alles, of alleen voor wat je nog moet leren?`,
  },
  {
    id: "leren-3",
    nr: 21,
    thema: "leren",
    type: "stelling",
    tekst: `Als AI een taak aantoonbaar net zo goed of beter doet, is 'maar dit hoort een mens te doen' geen geldig argument meer.`,
    crux: `Nu echt dubbel: de ene kant vindt dat kwaliteit doorslaggevend is en de rest sentiment, de andere kant houdt vol dat er taken zijn (een beoordeling, een ontslag, een eindverantwoordelijkheid) waar de menselijke hand het punt zelf is, los van kwaliteit. Dwing mensen een concrete taak te noemen en te zeggen voor wie het 'moet': de klant, de organisatie, of hun eigen vak in de vingers houden. De crux: verdedig je een principe, of een gewoonte die toevallig nog niet is ingehaald?`,
  },
  {
    id: "leren-4",
    nr: 22,
    thema: "leren",
    type: "stelling",
    tekst: `Het maakt mij niet uit hoe een collega tot goed werk komt, met of zonder AI.`,
    crux: `Splijtend: de ene kant vindt alleen het resultaat tellen, de andere vindt het pad (begrip, eigenaarschap, controleerbaarheid) wel degelijk relevant. Trek het uit elkaar: maakt het je niet uit bij een eindproduct, maar wel bij iemand die nog moet groeien, of bij werk dat jij mede moet kunnen uitleggen en verantwoorden?`,
  },
  {
    id: "leren-5",
    nr: 23,
    thema: "leren",
    type: "dilemma",
    tekst: `Een junior in je team levert opvallend goed werk, duidelijk met veel AI. Je merkt dat hij de onderliggende stof niet echt beheerst. De output is prima. Spreek je hem aan, of laat je het?`,
    crux: `Als de output goed is, wat is het probleem dan precies? Dwingt tot de vraag of je verantwoordelijk bent voor zijn ontwikkeling of alleen voor het resultaat. Wat gebeurt er als de AI er straks even niet is, of als hij doorgroeit naar werk waar hij die basis wel nodig heeft?`,
  },
  {
    id: "leren-6",
    nr: 24,
    thema: "leren",
    type: "dilemma",
    tekst: `Je moet een taak doen die je nog niet beheerst maar wel zou willen leren. De deadline is morgen. AI doet het in tien minuten goed. Doe je het zelf, langzaam en met fouten, of laat je het de AI doen?`,
    crux: `Het leer-versus-leveren-conflict, nu acuut. Bestaat er een tussenweg (AI doet het, jij leert ervan na), of is dat een illusie omdat je onder druk toch alleen kopieert? Wie draagt de kosten van jouw leren: jij, het team, de klant?`,
  },
  {
    id: "leren-7",
    nr: 25,
    thema: "leren",
    type: "dilemma",
    tekst: `De ervaren vakman die alles nog uit zijn hoofd doet, is in jouw team niet meer de plek waar mensen iets leren: juniors vragen het inmiddels aan AI. Houd je hem in de rol van leermeester, of laat je die rol verdwijnen?`,
    crux: `Verschuift weg van 'mag iemand AI weigeren' (dat is koers-6) naar wat het team verleert als de overdracht van mens naar mens stopt. De crux: de vakman wordt niet ingehaald op kwaliteit, maar op zijn functie als bron van kennis. Vraag door: zat in dat vragen-aan-de-vakman ook iets anders dan het antwoord (context, oordeel, waarom-niet-zo)? En als die rol verdwijnt, waar leren juniors dan het vak echt, en niet alleen de truc?`,
  },
  {
    id: "leren-8",
    nr: 26,
    thema: "leren",
    type: "open-vraag",
    tekst: `Welke vaardigheid die jij met moeite hebt opgebouwd, zou je een starter vandaag nog aanraden om te leren, en welke niet meer?`,
    crux: `Maakt persoonlijk en concreet welke expertise mensen blijvend van waarde achten en welke ze als achterhaald zien. Onthult vaak een generatiekloof en legt bloot wat iemand als de kern van zijn vak beschouwt versus wat toevallig bij vroeger hoorde.`,
  },
  {
    id: "leren-9",
    nr: 27,
    thema: "leren",
    type: "open-vraag",
    tekst: `Wanneer leerde je voor het laatst iets echt doordat je ergens op vastliep, en zou dat met AI erbij ook gebeurd zijn?`,
    crux: `Haalt een concreet verhaal naar boven over leren via frustratie en doorzetten. De reflectie: neemt AI alleen de frustratie weg, of ook het leren dat eraan vastzit? Test of mensen het verschil voelen tussen iets oplossen en iets snappen.`,
  },
  {
    id: "vertrouwen-1",
    nr: 28,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Bij AI hoef ik minder grondig te controleren dan vroeger: het is gewoon meestal goed, en alles dubbelchecken is verspilde tijd.`,
    crux: `Nu valt er wel iets te kiezen. De ene kant zegt: AI is inmiddels betrouwbaar genoeg, eindeloos narekenen is wantrouwen uit gewoonte. De andere kant hoort hier iemand zijn eigen slordigheid goedpraten. De crux: 'meestal goed' is precies de val, want de zeldzame fout zit verstopt in een tekst die vlot leest. Vraag door op het concrete moment waarop iemand niet checkte en dat goed of fout uitpakte.`,
    top: true,
  },
  {
    id: "vertrouwen-2",
    nr: 29,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Als de AI een fout maakt in mijn werk en ik die mis, kun je mij dat niet volledig aanrekenen: ik moest van de organisatie met AI, en niemand heeft tijd om alles na te lopen.`,
    crux: `Draait de sociaal-wenselijke versie om: nu is instemmen het ongemakkelijke standpunt. Voorstanders wijzen op opgelegde tools en reele werkdruk; tegenstanders vinden dat jij tekent voor je werk, punt. De crux is dat de organisatie de snelheid eist maar de verantwoordelijkheid bij het individu legt. Vraag: als niemand de tijd krijgt om te controleren, van wie is de fout dan echt?`,
  },
  {
    id: "vertrouwen-3",
    nr: 30,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Een vloeiende, zelfverzekerde AI-tekst maakt mij juist wantrouwiger, niet geruster.`,
    crux: `Splijtende stelling. Sommigen hebben dit afgeleerd en checken extra, anderen geven eerlijk toe dat overtuigende taal hen ontwapent. De crux is de schijnzekerheid van vlot taalgebruik: precies de eigenschap die AI prettig maakt, ondermijnt onze waakzaamheid. Laat benoemen wat 'overtuigend' met je oordeel doet.`,
    top: true,
  },
  {
    id: "vertrouwen-4",
    nr: 31,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Bij een beslissing over een mens, zoals aannemen of beoordelen, zou ik een AI-advies nooit zwaarder laten wegen dan mijn eigen oordeel.`,
    crux: `Klinkt vanzelfsprekend tot iemand opmerkt dat het menselijke onderbuikgevoel ook vol vooroordeel zit. De spanning: is je eigen oordeel werkelijk eerlijker, of alleen vertrouwder? Onderscheid waar AI mag meewegen (structuur, blinde vlekken) van waar de mens moet beslissen (verantwoordelijkheid, het laatste woord over een ander).`,
  },
  {
    id: "vertrouwen-5",
    nr: 32,
    thema: "vertrouwen",
    type: "dilemma",
    tekst: `Je stuurt een rapport naar een klant. Achteraf zie je dat de AI een cijfer heeft verzonnen dat niemand had gecontroleerd. De klant heeft niets gemerkt. Vertel je het?`,
    crux: `Niemand merkte het, dus zwijgen 'kost' niets. Hier botst integriteit met gezichtsverlies en met de vraag of een onopgemerkte fout nog een fout is. Het echte gesprek: wat doet zwijgen met het vertrouwen in jezelf en met hoe het team met fouten omgaat?`,
  },
  {
    id: "vertrouwen-6",
    nr: 33,
    thema: "vertrouwen",
    type: "dilemma",
    tekst: `Je hebt weinig tijd. De AI levert een prima ogende tekst over een onderwerp waar je zelf weinig verstand van hebt. Verstuur je 'm?`,
    crux: `De pijnlijke combinatie van tijdsdruk plus geen eigen kennis om te controleren. Juist als je het niet kunt beoordelen, ben je het meest afhankelijk en het kwetsbaarst. Het gesprek: is 'ik kon het toch niet controleren' een excuus, of juist de rode vlag om te stoppen?`,
  },
  {
    id: "vertrouwen-7",
    nr: 34,
    thema: "vertrouwen",
    type: "dilemma",
    tekst: `Een collega plakt klant- en personeelsgegevens in een gratis AI-tool omdat het sneller werkt. Jij ziet het. Wat doe je?`,
    crux: `Snelheid botst met vertrouwelijkheid en de regels (denk AVG). De crux: is het probleem de collega, of dat er geen veilige tool en geen duidelijke afspraak is, zodat de makkelijke weg ook de foute is? En had jij het in zijn schoenen anders gedaan?`,
  },
  {
    id: "vertrouwen-8",
    nr: 35,
    thema: "vertrouwen",
    type: "open-vraag",
    tekst: `Wanneer merkte je achteraf dat je een AI-antwoord had vertrouwd zonder het echt te kunnen beoordelen, en wat deed dat met je?`,
    crux: `Verschuift van 'AI maakte een fout' naar 'ik leunde erop zonder het door te hebben'. Geen anekdote over een rare uitvoer, maar reflectie op het eigen moment van blind vertrouwen. Let als begeleider op het verschil tussen 'het ging goed dus prima' en het ongemak dat iemand voelt nu hij het hardop zegt. Vraag door: wat had je anders kunnen doen, en deed je dat de volgende keer ook echt?`,
  },
  {
    id: "vertrouwen-9",
    nr: 36,
    thema: "vertrouwen",
    type: "open-vraag",
    tekst: `Wat moet er in ons team gebeuren voordat we durven zeggen: dit AI-resultaat vertrouwen we zonder te controleren?`,
    crux: `Verschuift van het individu naar afspraken. Dwingt het team de drempel concreet te maken: welk soort taken, welk risico, welke staat van dienst van de tool. Het gesprek onthult of er een gedeelde norm is, of dat iedereen op gevoel een eigen grens trekt.`,
  },
  {
    id: "koers-1",
    nr: 37,
    thema: "koers",
    type: "stelling",
    tekst: `Wij rennen achter AI aan uit angst om achter te blijven, niet omdat we weten waar we heen willen.`,
    crux: `Echt dubbel: de ene helft herkent de FOMO en branchedruk, de andere vindt dit cynisch en ziet wel degelijk een plan. De crux is of 'koers' bij dit team een keuze is of een reflex. Vraag door: noem een AI-stap die we het afgelopen jaar zetten. Deden we dat omdat het ons werk beter maakte, of omdat we niet durfden stil te staan? En wie zou het merken als we een jaar lang niets nieuws met AI deden?`,
  },
  {
    id: "koers-2",
    nr: 38,
    thema: "koers",
    type: "stelling",
    tekst: `De winst van AI gaat vooral naar de organisatie en haar klanten, niet naar ons als medewerkers.`,
    crux: `Verschuift van 'mijn tijd' (dat pakt werk-1 al) naar 'wiens winst'. Echt splijtend: sommigen vinden dit logisch (zo werkt loondienst nu eenmaal), anderen voelen dat ze harder produceren zonder dat er iets tegenover staat. De crux: als de opbrengst eenrichtingsverkeer is, waarom zou je dan je beste AI-trucs delen? Vraag door: wat zou een eerlijk aandeel in de winst voor jou concreet zijn, tijd, geld, rust, of zeggenschap?`,
  },
  {
    id: "koers-3",
    nr: 39,
    thema: "koers",
    type: "stelling",
    tekst: `Onze koplopers op AI lopen zo hard dat de rest afhaakt.`,
    crux: `Legt de kloof tussen enthousiastelingen en de rest bloot. Een koploper zal dit oneerlijk vinden, een achterblijver herkenbaar. Het gesprek gaat over of voorlopers het team meetrekken of juist een tweedeling creeren, en wie verantwoordelijk is om de groep bij elkaar te houden.`,
  },
  {
    id: "koers-4",
    nr: 40,
    thema: "koers",
    type: "stelling",
    tekst: `Ik durf op werk niet hardop te zeggen dat ik AI nog maar weinig gebruik.`,
    crux: `De omgekeerde FOMO: schaamte over achterblijven. Sommigen voelen die druk sterk, anderen helemaal niet. Het gesprek moet de sociale norm rond AI-gebruik blootleggen: is er stiekem een wedloop ontstaan waarin niet-gebruiken verdacht is geworden, en klopt dat beeld eigenlijk wel?`,
  },
  {
    id: "koers-5",
    nr: 41,
    thema: "koers",
    type: "dilemma",
    tekst: `Een collega werkt met een verboden AI-tool en is daardoor merkbaar sneller en beter dan jij, die netjes binnen de regels blijft. Je beoordelingsgesprek komt eraan. Wat doe je?`,
    crux: `Anders dan koers-6 en vertrouwen-7: hier ligt de pijn niet bij melden of bij AVG, maar bij eigenbelang. Braaf zijn kost jou je beoordeling. Geen schoon antwoord: je kunt niet tegelijk de regels respecteren en niet de dupe zijn. De crux: is het echte probleem de collega, of een beleid dat de regelvolger straft en de overtreder beloont? Vraag door: zou jij overstappen op zijn aanpak, hem aangeven, of bij de leiding neerleggen dat de regel niet werkt?`,
  },
  {
    id: "koers-6",
    nr: 42,
    thema: "koers",
    type: "dilemma",
    tekst: `Jullie team moet kiezen: het AI-budget in een dure alleskunner steken die een paar koplopers laat vliegen, of in simpele training zodat iedereen meekomt. Het geld is er maar voor een van de twee. Waar zet je op in?`,
    crux: `Dwingt een echte koers-keuze op teamniveau, niet weer 'spreek ik die ene collega aan'. Snelheid van de voorhoede tegenover de groep bij elkaar houden: dezelfde tweedeling als koers-3, maar nu moet je er geld op zetten. Geen schoon antwoord: investeer je in de top dan groeit de kloof, investeer je in de basis dan rem je de koplopers. Vraag door: voor wie is dit budget er eigenlijk, en wie beslist dat nu in de praktijk?`,
  },
  {
    id: "koers-7",
    nr: 43,
    thema: "koers",
    type: "open-vraag",
    tekst: `Wat zou er bij ons concreet veranderen als we over een jaar 'goed bezig met AI' zouden zijn? Hoe ziet een gewone werkdag er dan uit?`,
    crux: `Dwingt mensen voorbij de buzzwords naar een concreet beeld. Het gesprek onthult of er uberhaupt een gedeeld doel is, of dat iedereen iets anders voor ogen heeft. De verschillen in antwoorden zijn waardevoller dan de overeenkomsten: daar zit de verborgen onenigheid over de koers.`,
  },
  {
    id: "koers-8",
    nr: 44,
    thema: "koers",
    type: "open-vraag",
    tekst: `Wie of wat bepaalt eigenlijk ons tempo met AI: de directie, de markt, een paar enthousiastelingen, of de waan van de dag?`,
    crux: `Maakt zichtbaar dat 'de koers' vaak helemaal niet bewust gekozen is. Het gesprek moet blootleggen of er een stuurman is of dat het team meedrijft op externe druk en toeval. Het ontbreken van een duidelijk antwoord is hier het belangrijkste inzicht.`,
    top: true,
  },
  {
    id: "koers-9",
    nr: 45,
    thema: "koers",
    type: "open-vraag",
    tekst: `Wat doen we als de AI-tool waar we op zijn gaan leunen morgen veel duurder of uit de lucht is?`,
    crux: `Verschuift van persoonlijke naar collectieve afhankelijkheid. Het gesprek moet blootleggen hoeveel van het werk al stilzwijgend op een externe dienst rust, en of er een plan B is. Vaak blijkt dat niemand het overzicht heeft, en dat is precies het risico.`,
  },
  {
    id: "mens-1",
    nr: 46,
    thema: "mens",
    type: "stelling",
    tekst: `Het maakt mij niet uit of een tekst, foto of liedje door een mens of door AI is gemaakt, als ik er maar van geniet.`,
    crux: `Splijt de groep tussen 'het gaat om wat het met mij doet' en 'het gaat om de intentie erachter'. Vraag door: verandert je oordeel als je achteraf hoort dat het AI was? En zo ja, waarom? Dat legt bloot of we de inhoud waarderen, de menselijke moeite, of vooral de illusie van menselijkheid.`,
  },
  {
    id: "mens-2",
    nr: 47,
    thema: "mens",
    type: "stelling",
    tekst: `Als ik iets goeds aflever dat grotendeels door AI is gemaakt, mag ik er net zo trots op zijn alsof ik het zelf had bedacht.`,
    crux: `Nu kiest de zaal echt een kant. De ene helft zegt: het resultaat is van mij, ik heb het aangestuurd en goedgekeurd, klaar. De andere helft voelt dat trots iets met eigen worsteling te maken heeft die hier ontbreekt. Vraag door waar de grens ligt: ben je net zo trots op een door AI geschreven mail als op een idee dat je zelf bedacht? En als trots verdwijnt zodra AI het zware werk doet, wat zegt dat over waar je je eigenwaarde uit haalt?`,
  },
  {
    id: "mens-3",
    nr: 48,
    thema: "mens",
    type: "stelling",
    tekst: `Over vijf jaar bestaat mijn functie niet meer in de vorm die ik nu ken.`,
    crux: `Peilt baanzekerheid zonder het woord angst te gebruiken. Sommigen zeggen het laconiek ('alles verandert toch'), anderen voelen echte dreiging. Vraag door naar het verschil tussen 'mijn taken veranderen' en 'mij hebben ze niet meer nodig'. Laat mensen benoemen wat ze zouden missen, niet alleen wat ze vrezen te verliezen.`,
  },
  {
    id: "mens-4",
    nr: 49,
    thema: "mens",
    type: "stelling",
    tekst: `Een bedankje of beoordeling die met AI is geschreven, is voor mij net zoveel waard als een zelfgeschreven exemplaar.`,
    crux: `Raakt erkenning en aandacht op een herkenbaar moment. Sommigen vinden dat de inhoud telt, anderen voelen zich gekrenkt door een AI-bedankje. De crux: waarderen we de woorden, of de tijd en moeite die iemand erin stak? Als AI de moeite wegneemt, verdwijnt dan ook het gebaar? Vraag of iemand ooit een AI-bericht herkende en wat dat deed.`,
  },
  {
    id: "mens-5",
    nr: 50,
    thema: "mens",
    type: "dilemma",
    tekst: `Je doet een taak die je echt leuk vindt en goed in bent. Je manager stelt voor die voortaan met AI te doen, veel sneller, zodat je tijd overhoudt voor 'belangrijker werk'. Wat zeg je?`,
    crux: `Efficientie botst met plezier en betekenis. Mensen voelen zich vaak schuldig om te zeggen 'maar dit vind ik nou juist leuk'. De crux: mag plezier in werk een geldig argument zijn tegen automatiseren, of moet alles wat sneller kan ook sneller? En wie bepaalt eigenlijk wat 'belangrijker' werk is?`,
    top: true,
  },
  {
    id: "mens-6",
    nr: 51,
    thema: "mens",
    type: "dilemma",
    tekst: `Een collega die al jaren het creatieve werk doet, levert nu zichtbaar mindere dingen dan de AI-output van een nieuwe collega. Iedereen ziet het, niemand zegt het. Wat doe jij?`,
    crux: `Vakmanschap dat wordt ingehaald, en de pijn daarachter. De crux is niet 'wie is beter', maar: hoe ga je om met iemand wiens identiteit aan een vaardigheid hangt die nu minder telt? Gaat dit om eerlijk zijn, beschermen, of wegkijken? En wat zou jij willen dat ze tegen jou deden?`,
  },
  {
    id: "mens-7",
    nr: 52,
    thema: "mens",
    type: "dilemma",
    tekst: `Je bent ergens echt trots op. Een collega zegt enthousiast: knap, heb je dat met AI gedaan? Het antwoord is nee. Wat voel je, en wat zeg je?`,
    crux: `De aanname dat goed werk wel met AI zal zijn. De crux: het ongemak dat menselijke kwaliteit nu standaard verdacht is, en wat dat doet met trots. Gaat het je om de eer, of om iets diepers over gezien worden? Doorvragen: wat betekent 'met AI' eigenlijk, en waarom voelt het als een diskwalificatie?`,
    top: true,
  },
  {
    id: "mens-8",
    nr: 53,
    thema: "mens",
    type: "open-vraag",
    tekst: `Welk deel van jouw werk zou je blijven doen zoals nu, ook als de hele organisatie overstapt op AI en jij daardoor langzamer en duurder bent dan de rest?`,
    crux: `Niet vragen wat AI niet kan, maar of je je grens durft te betalen. Door de prijs erbij te zetten (langzamer, duurder, uit de pas lopen) wordt het verschil zichtbaar tussen een echte waarde en een vrijblijvend principe. Let op wie schuift zodra het wat kost. Vraag door: is dit iets wat je vak voor jou de moeite waard maakt, of een gewoonte die je niet durft los te laten? En wat zou je tegen een baas zeggen die dat stukje wil wegautomatiseren?`,
  },
  {
    id: "mens-9",
    nr: 54,
    thema: "mens",
    type: "open-vraag",
    tekst: `Stel dat AI het saaie deel van je werk volledig overneemt. Wat blijft er over, en wil je dat?`,
    crux: `Confronteert het cliche 'AI neemt het saaie werk, jij houdt het leuke' met de werkelijkheid. Vaak zit betekenis juist in de afwisseling, en geeft saai werk rust en houvast. De crux: is een werkdag van alleen maar 'hoogwaardig denkwerk' wel houdbaar of menselijk? Wat als het saaie deel je ademruimte was?`,
  },
];

export const spelregels: Spelregel[] = [
  {
    titel: "Kies een kant van de kamer",
    tekst: "Bij een stelling: links is oneens, rechts is eens, het midden bestaat niet. Iedereen loopt fysiek naar een kant en moet kiezen. Vraag daarna eerst iemand uit de kleinste groep waarom hij daar staat. Overlopen mag, dat is juist het doel.",
  },
  {
    titel: "Eerst stil schrijven, dan delen",
    tekst: "Bij dilemma's: laat iedereen eerst twee minuten voor zichzelf opschrijven wat hij zou doen, voordat er iemand praat. Zo committeert iedereen aan een eigen antwoord en plooien mensen zich minder naar de eerste die spreekt of naar de leidinggevende.",
  },
  {
    titel: "Speel advocaat van de duivel",
    tekst: "Als de groep het verdacht snel eens is, wijs dan een of twee mensen aan die het tegendeel moeten verdedigen, of ze het menen of niet. Spreek vooraf af dat het een rol is, geen echte mening. Zo maak je de minderheidsstem hoorbaar.",
  },
  {
    titel: "De begeleider houdt zich op de vlakte",
    tekst: "Leid je de sessie en zit je zelf in het team of ben je de baas? Zeg vooraf dat je je eigen mening voor je houdt tot het einde. Bij AI-gesprekken bewegen meningen mee met hierarchie. Jouw taak is doorvragen, niet gelijk krijgen.",
  },
  {
    titel: "Vraag altijd door naar het concrete voorbeeld",
    tekst: "Een gesprek over AI verzandt snel in algemeenheden. Houd een vaste vervolgvraag bij de hand: wanneer gebeurde dat voor het laatst bij jou? Het echte inzicht zit in de concrete misser of het concrete moment, niet in het standpunt.",
  },
  {
    titel: "Sluit af met een vangst, niet met een conclusie",
    tekst: "Een goed gesprek hoeft niet in een afspraak te eindigen. Sluit af met een rondje: wat neem je mee, of wat blijft bij je hangen? Een zin per persoon, geen discussie meer. Dwing geen consensus af waar die er niet is.",
  },
];

// Handige afgeleiden
export const themaMap: Record<ThemaKey, Thema> = themas.reduce(
  (acc, t) => {
    acc[t.key] = t;
    return acc;
  },
  {} as Record<ThemaKey, Thema>,
);

export function kaartenVoorThema(key: ThemaKey): Kaart[] {
  return kaarten.filter((k) => k.thema === key);
}
