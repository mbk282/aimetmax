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

// Volgorde bepaalt welke thema's vooraan in de chips/filters staan. Bewust NIET
// leaden met "Eerlijk over AI" (voelde herhalend); openen met de thema's die het
// sterkst aanslaan (mens, werk) en "eerlijk" als reflectie achteraan.
export const themas: Thema[] = [
  {
    key: "mens",
    naam: "Mens & betekenis",
    kleur: "#875A6B",
    tint: "#ECDCE2",
    kicker: "Wat blijft er van ons werk?",
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
    key: "eerlijk",
    naam: "Eerlijk over AI",
    kleur: "#E8590C",
    tint: "#FBE3D4",
    kicker: "Transparantie, schijn en vertrouwen",
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
    id: "mens-1",
    nr: 1,
    thema: "mens",
    type: "stelling",
    tekst: `Het maakt mij niet uit of een tekst, foto of liedje door een mens of door AI is gemaakt, als ik er maar van geniet.`,
    crux: `Splijt de groep tussen 'het gaat om wat het met mij doet' en 'het gaat om de intentie erachter'. Vraag door: verandert je oordeel als je achteraf hoort dat het AI was? En zo ja, waarom? Dat legt bloot of we de inhoud waarderen, de menselijke moeite, of vooral de illusie van menselijkheid.`,
  },
  {
    id: "mens-2",
    nr: 2,
    thema: "mens",
    type: "stelling",
    tekst: `Als ik iets goeds aflever dat grotendeels met AI is gemaakt, mag ik er net zo trots op zijn alsof ik het zelf had bedacht.`,
    crux: `Nu kiest de zaal echt een kant. De ene helft zegt: het resultaat is van mij, ik heb het aangestuurd en goedgekeurd, klaar. De andere helft voelt dat trots iets met eigen worsteling te maken heeft die hier ontbreekt. Vraag door waar de grens ligt: ben je net zo trots op een door AI geschreven mail als op een idee dat je zelf bedacht? En als trots verdwijnt zodra AI het zware werk doet, wat zegt dat over waar je je eigenwaarde uit haalt?`,
  },
  {
    id: "mens-3",
    nr: 3,
    thema: "mens",
    type: "stelling",
    tekst: `Over vijf jaar bestaat mijn functie niet meer in de vorm die ik nu ken.`,
    crux: `Peilt baanzekerheid zonder het woord angst te gebruiken. Sommigen zeggen het laconiek ('alles verandert toch'), anderen voelen echte dreiging. Vraag door naar het verschil tussen 'mijn taken veranderen' en 'mij hebben ze niet meer nodig'. Laat mensen benoemen wat ze zouden missen, niet alleen wat ze vrezen te verliezen.`,
  },
  {
    id: "mens-4",
    nr: 4,
    thema: "mens",
    type: "stelling",
    tekst: `Een bedankje of verjaardagswens voor een collega schrijf ik gerust met AI. Dat ik eraan dacht is wat telt, niet of ik de woorden zelf koos.`,
    crux: `Nu splijt het wel, want dit doen mensen echt en verdedigen het. De ene kant legt het gebaar in de gedachte: je dacht aan die collega, AI hielp je het netjes te zeggen, beter dan een houterig zinnetje of helemaal niets sturen. De andere kant zegt dat een persoonlijk bericht zijn waarde verliest zodra je de woorden niet zelf koos, dan is het een leeg gebaar. Vraag door: zou je het erg vinden als jouw bedankje achteraf met AI bleek geschreven? En maakt het verschil of het een vluchtig kattebelletje is of een afscheidswoord?`,
  },
  {
    id: "mens-5",
    nr: 5,
    thema: "mens",
    type: "dilemma",
    tekst: `Je doet een taak die je echt leuk vindt en goed in bent. Je manager stelt voor die voortaan met AI te doen, veel sneller, zodat je tijd overhoudt voor 'belangrijker werk'. Wat zeg je?`,
    crux: `Efficientie botst met plezier en betekenis. Mensen voelen zich vaak schuldig om te zeggen 'maar dit vind ik nou juist leuk'. De crux: mag plezier in werk een geldig argument zijn tegen automatiseren, of moet alles wat sneller kan ook sneller? En wie bepaalt eigenlijk wat 'belangrijker' werk is?`,
    top: true,
  },
  {
    id: "mens-6",
    nr: 6,
    thema: "mens",
    type: "dilemma",
    tekst: `Een collega die al jaren het creatieve werk doet, levert nu zichtbaar mindere dingen dan de AI-output van een nieuwe collega. Iedereen ziet het, niemand zegt het. Wat doe jij?`,
    crux: `Vakmanschap dat wordt ingehaald, en de pijn daarachter. De crux is niet 'wie is beter', maar: hoe ga je om met iemand wiens identiteit aan een vaardigheid hangt die nu minder telt? Gaat dit om eerlijk zijn, beschermen, of wegkijken? En wat zou jij willen dat ze tegen jou deden?`,
    top: true,
  },
  {
    id: "mens-7",
    nr: 7,
    thema: "mens",
    type: "dilemma",
    tekst: `Je bent ergens echt trots op. Een collega zegt enthousiast: knap, heb je dat met AI gedaan? Het antwoord is nee. Wat voel je, en wat zeg je?`,
    crux: `De aanname dat goed werk wel met AI zal zijn. De crux: het ongemak dat menselijke kwaliteit nu standaard verdacht is, en wat dat doet met trots. Gaat het je om de eer, of om iets diepers over gezien worden? Doorvragen: wat betekent 'met AI' eigenlijk, en waarom voelt het als een diskwalificatie?`,
    top: true,
  },
  {
    id: "mens-8",
    nr: 8,
    thema: "mens",
    type: "open-vraag",
    tekst: `Welk deel van jouw werk zou je blijven doen zoals nu, ook als de hele organisatie overstapt op AI en jij daardoor langzamer en duurder bent dan de rest?`,
    crux: `Niet vragen wat AI niet kan, maar of je je grens durft te betalen. Door de prijs erbij te zetten (langzamer, duurder, uit de pas lopen) wordt het verschil zichtbaar tussen een echte waarde en een vrijblijvend principe. Let op wie schuift zodra het wat kost. Vraag door: is dit iets wat je vak voor jou de moeite waard maakt, of een gewoonte die je niet durft los te laten? En wat zou je tegen een baas zeggen die dat stukje wil wegautomatiseren?`,
  },
  {
    id: "mens-9",
    nr: 9,
    thema: "mens",
    type: "open-vraag",
    tekst: `Stel dat AI het saaie deel van je werk volledig overneemt. Wat blijft er over, en wil je dat?`,
    crux: `Confronteert het cliche 'AI neemt het saaie werk, jij houdt het leuke' met de werkelijkheid. Vaak zit betekenis juist in de afwisseling, en geeft saai werk rust en houvast. De crux: is een werkdag van alleen maar 'hoogwaardig denkwerk' wel houdbaar of menselijk? Wat als het saaie deel je ademruimte was?`,
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
    tekst: `Ik pas teksten die ik met AI maak bewust aan zodat ze niet door AI geschreven lijken.`,
    crux: `Bijna iedereen herkent het gedrag, maar het motief splijt: de een doet het om professioneel en persoonlijk over te komen, de ander vindt het verbloemen ronduit oneerlijk, weer een ander vindt het overdreven gedoe. Stuur het gesprek naar het waarom, niet naar 'doe je dit'. Vraag door: wat verberg je precies, dat je AI gebruikte of dat je er weinig tijd in stak? En zou je het erg vinden als een collega het bij jou doorhad?`,
    top: true,
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
    tekst: `Iets in een uur met AI afmaken voelt voor mij minder als gepresteerd dan er een halve dag zelf over zwoegen, ook al is het werk af.`,
    crux: `Splijt het team: de een herkent het ongemak meteen en voelt zich pas tevreden als het zwaar was, de ander vindt dat irrationeel en kijkt alleen of het werk klopt. De spanning is dat we moeite en prestatie door elkaar halen sinds AI de moeite eruit haalt. Vraag door: bij welke taak voelde je dit voor het laatst? En: presteer je voor het resultaat of voor het gevoel dat het je iets kostte?`,
    top: true,
  },
  {
    id: "werk-6",
    nr: 15,
    thema: "werk",
    type: "dilemma",
    tekst: `Een teamlid levert in een dag werk in waar normaal een week voor staat, duidelijk met veel AI. De kwaliteit is prima. Een ander teamlid voelt zich er ongemakkelijk bij. Wat doe je?`,
    crux: `Dwingt een keuze tussen output belonen en het ongemak serieus nemen. Onder de oppervlakte: bestaat er een onuitgesproken norm over hoeveel inspanning werk hoort te kosten? En wat doet dit met de eerlijkheid van beoordelingen en werkdruk? Geen schoon antwoord: je kunt niet tegelijk de snelheid vieren en de twijfel wegwuiven.`,
    top: true,
  },
  {
    id: "werk-7",
    nr: 16,
    thema: "werk",
    type: "stelling",
    tekst: `Soms twijfel ik of ik met AI echt sneller werk. Het controleren, bijsturen en herformuleren vreet de tijdwinst weer op.`,
    crux: `Splijt omdat een deel van het team de tijdwinst oprecht voelt (bij boilerplate, mails, code) en een ander deel vooral merkt dat het werk verschoven is van zelf doen naar nakijken en corrigeren, en daardoor twijfelt of er netto iets overblijft. De makkelijke uitweg is 'het wordt vanzelf beter met oefening'. Vraag dan door: bij welke taak gebeurt dit jou nu nog steeds, ook al gebruik je AI al maanden? En: heb je ooit echt gemeten of je gevoel klopt, of is 'sneller' vooral een aanname die je niet meer toetst?`,
    top: true,
  },
  {
    id: "werk-8",
    nr: 17,
    thema: "werk",
    type: "open-vraag",
    tekst: `Welke taak heb je inmiddels zo aan AI overgelaten dat je niet meer zeker weet of je hem zelf nog goed zou kunnen?`,
    crux: `Verschuift van onschuldige gewoonte naar de ongemakkelijke vraag of er stilletjes een vaardigheid is weggelekt. De winst zit in de eerlijkheid: durft iemand toe te geven dat hij het zonder AI niet meer dunnetjes overdoet? Vraag door of dat erg is. Soms niet (je doet het toch nooit meer zelf), soms wel (het is je vak of je controlevermogen). Laat het verschil benoemen.`,
    top: true,
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
    type: "open-vraag",
    tekst: `Bij welke inschattingen of beslissingen leun je inmiddels meer op AI dan op je eigen oordeel?`,
    crux: `Vraagt om een concreet voorbeeld uit het eigen werk, geen principe. De angel: je geeft toe dat je je oordeel hebt uitbesteed bij iets waar je vroeger juist op je ervaring vertrouwde. Sommigen noemen dat efficiënt, anderen het begin van verleren, daar splijt het. Vraag door: woog je voor het laatst zelf nog af of het klopte, en zou je het opmerken als de AI ernaast zat? Houd het bij oordeel en inschatting, niet bij wat je technisch nog zelf kunt maken (dat is werk-8).`,
  },
  {
    id: "leren-2",
    nr: 20,
    thema: "leren",
    type: "open-vraag",
    tekst: `Bij welke dingen worstel je liever zelf dan dat je het aan AI overlaat? En waar geef je dat worstelen juist graag uit handen?`,
    crux: `Dit ontlokt geen principe maar een concrete grenslijn die per persoon anders ligt. De een wil zelf blijven nadenken bij het opbouwen van een argument, de ander geeft dat juist graag weg en bewaart de strijd voor iets anders. Doorvragen: noem een taak van deze week waarbij je bewust niet naar AI greep, en waarom precies die? En waar baalde je achteraf dat je het wel uit handen had gegeven?`,
  },
  {
    id: "leren-3",
    nr: 21,
    thema: "leren",
    type: "stelling",
    tekst: `Goed in je vak zijn betekent voor mij niet meer dat je het zelf kunt, maar dat je weet hoe je het met AI voor elkaar krijgt.`,
    crux: `Splijt op wat 'goed in je vak' nu betekent. De ene kant zegt: als je het niet zelf kunt, kun je AI ook niet sturen of beoordelen, en is je vakmanschap een leeg omhulsel. De andere kant zegt: het resultaat telt, en wie het snelst met AI tot goed werk komt is de echte vakmens, niet wie het nog handmatig kan. Dwing mensen een concrete vaardigheid te noemen waar dit voor hen omslaat. Vraag door: leg je hiermee de lat hoger voor je collega's dan een paar jaar geleden, en zou je zelf nog aangenomen worden met die maat?`,
    top: true,
  },
  {
    id: "leren-4",
    nr: 22,
    thema: "leren",
    type: "stelling",
    tekst: `Het maakt mij niet uit hoe een collega tot goed werk komt, met of zonder AI.`,
    crux: `Splijtend: de ene kant vindt alleen het resultaat tellen, de andere vindt het pad (begrip, eigenaarschap, controleerbaarheid) wel degelijk relevant. Trek het uit elkaar: maakt het je niet uit bij een eindproduct, maar wel bij iemand die nog moet groeien, of bij werk dat jij mede moet kunnen uitleggen en verantwoorden?`,
    top: true,
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
    type: "open-vraag",
    tekst: `Welke vaardigheid heb je besloten niet meer onder de knie te krijgen, omdat AI het toch wel doet? Denk aan formules in Excel, een nette mail in het Engels, of de techniek onder je werk. Noem er een.`,
    crux: `Ontlokt een concreet, persoonlijk moment dat de meeste mensen herkennen maar zelden hardop zeggen: iets wat je stilletjes hebt laten lopen ('dat zoek ik niet meer uit, AI fikst het wel'). De drie voorbeelden maken hem laagdrempelig genoeg om echt te antwoorden in plaats van te blijven hangen in 'tja, van alles'. Doorvragen: was dat een bewuste keuze of is het gewoon zo gegroeid? En zou je het erg vinden als AI er morgen mee stopt en je weer op jezelf bent aangewezen?`,
  },
  {
    id: "leren-7",
    nr: 25,
    thema: "leren",
    type: "dilemma",
    tekst: `Je merkt dat de juniors in je team hun vragen steeds vaker aan AI stellen en steeds minder aan de ervaren mensen. Stuur je ze bewust terug naar je seniors, ook al kost dat tijd en voelt het soms ouderwets? Of laat je het zo, omdat AI nu eenmaal sneller en altijd beschikbaar is?`,
    crux: `Geen schone keuze: terugsturen naar ervaren collega's levert context, tegenvragen en het waarom-niet-zo op die een AI-antwoord mist, maar het kost tijd en kan betuttelend voelen. Het laten lopen is makkelijker en deels gewoon hoe het nu werkt, maar de overdracht van mens op mens droogt stilletjes op. Vraag door: wat haalde jij vroeger uit iemand iets vragen wat je niet uit een antwoord alleen krijgt? En als die rol verdwijnt, waar leren juniors het vak dan echt, en niet alleen de truc?`,
    top: true,
  },
  {
    id: "leren-8",
    nr: 26,
    thema: "leren",
    type: "open-vraag",
    tekst: `Welke vaardigheid die jij met moeite hebt opgebouwd, zou je een starter vandaag nog aanraden om te leren, en welke niet meer?`,
    crux: `Maakt persoonlijk en concreet welke expertise mensen blijvend van waarde achten en welke ze als achterhaald zien. Onthult vaak een generatiekloof en legt bloot wat iemand als de kern van zijn vak beschouwt versus wat toevallig bij vroeger hoorde.`,
    top: true,
  },
  {
    id: "leren-9",
    nr: 27,
    thema: "leren",
    type: "stelling",
    tekst: `Mijn vak verschuift van zelf maken naar beoordelen wat AI maakt. En dat voelt voor mij als een degradatie.`,
    crux: `Twee lagen in een. Dat het vak verschuift van maken naar beoordelen herkent bijna iedereen, dus daar zit de splitsing niet. De breuk zit in het woord 'degradatie': de maker die trots is op zijn ambacht voelt zich teruggebracht tot redacteur, terwijl een ander beoordelen juist het schaarsere, hogere werk vindt. Doorvragen: noem het concrete stuk maakwerk dat je straks niet meer zelf doet. Voor wie aan tafel is beoordelen een stap omhoog en voor wie een stap omlaag? En wie zou bij 'alleen nog beoordelen' uit het vak stappen?`,
    top: true,
  },
  {
    id: "vertrouwen-1",
    nr: 28,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Anderen vertrouwen te makkelijk op wat AI oplevert. Zelf kijk ik het beter na dan de meeste mensen om me heen.`,
    crux: `De val zit in de tweede zin: bijna iedereen vindt dat hij zelf netjes nakijkt en dat het de ander is die te makkelijk vertrouwt. Laat de groep instemmen en wijs er dan op dat het niet kan kloppen dat iedereen beter is dan gemiddeld. Doorvragen: waarop baseer je dat anderen het slechter doen, heb je dat echt gezien of neem je het aan? En als een collega dit over jou zei, zou je het herkennen?`,
  },
  {
    id: "vertrouwen-2",
    nr: 29,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Toen ik met AI begon, controleerde ik alles. Inmiddels lees ik het meeste alleen nog snel door, want de vorige keren klopte het toch.`,
    crux: `Deze kaart legt de sluipende gewenning bloot: vertrouwen in AI groeit niet door een besluit, maar door routine. De ene kant zegt dat dit terecht opgebouwd vertrouwen is, net als bij een collega die zich bewijst. De andere kant zegt dat een tool die negen keer klopt en de tiende keer iets verzint, je juist beloont op het moment dat je stopte met kijken. Vraag door: wanneer liep je voor het laatst een AI-resultaat echt regel voor regel na, en waarom die keer wel? En: zou je bij een nieuwe collega na drie goede stukken ook al stoppen met controleren?`,
  },
  {
    id: "vertrouwen-3",
    nr: 30,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Niet al het AI-werk verdient dezelfde controle. Bij sommige taken check ik bewust alleen de plekken waar een fout echt pijn zou doen, de rest laat ik staan. Dat is geen luiheid maar een keuze.`,
    crux: `Splijt omdat een serieuze minderheid risico-gebaseerd checken hardop durft te verdedigen als vakmanschap, terwijl anderen vinden dat je zo juist de fouten mist die je niet zag aankomen. Doorvragen: welke plekken bestempel jij als 'mag fout zijn', en heb je je daar weleens in vergist? En wie bepaalt eigenlijk waar de pijn zit, jij of degene die het werk straks gebruikt?`,
    top: true,
  },
  {
    id: "vertrouwen-4",
    nr: 31,
    thema: "vertrouwen",
    type: "stelling",
    tekst: `Een fout die de AI maakte en ik niet zag, is minder erg dan dezelfde fout die ik zelf had bedacht.`,
    crux: `Bijna iedereen voelt dit stiekem, en juist daarom is hardop oneens zijn ongemakkelijk. De ene kant zegt: een gemiste AI-fout is een controlefout, geen domheid, en dat weegt lichter dan zelf de mist in gaan. De andere kant zegt: voor de klant of de patient maakt de herkomst niets uit, de fout staat in jouw werk met jouw naam erop, en 'de AI deed het' is precies de smoes die we niet moeten accepteren. De crux: trekt de uitkomst zich iets aan van wie hem veroorzaakte? Vraag door: zou je dit verschil ook hardop maken tegen degene die de schade opliep?`,
  },
  {
    id: "vertrouwen-5",
    nr: 32,
    thema: "vertrouwen",
    type: "dilemma",
    tekst: `Je ontdekt vlak voor de deadline een fout in een stuk dat met AI is gemaakt en dat al rondgaat in het team. De fout corrigeren betekent toegeven dat het werk minder grondig is nagekeken dan iedereen aanneemt. Stil herstellen kan ook, maar dan blijft staan dat het 'gewoon klopte'. Meld je hoe de fout erin kwam, of repareer je het zonder dat verhaal erbij?`,
    crux: `Dit splijt omdat de ene kant zegt 'de fout is weg, dat is wat telt, de rest is ruis' en de andere kant zegt 'als je verzwijgt hoe het kon gebeuren, herhaalt het zich en dek je het gat in de controle toe'. Het gaat echt over AI: de fout en het ongemak komen voort uit werk dat met AI is gemaakt en te licht is nagekeken. Doorvragen: verandert je keuze als jij degene bent die het stuk had moeten controleren? En als een collega het stil zou repareren, zou jij dat dan correct vinden of als wegmoffelen zien?`,
    top: true,
  },
  {
    id: "vertrouwen-6",
    nr: 33,
    thema: "vertrouwen",
    type: "dilemma",
    tekst: `Een selectietool die aantoonbaar minder bevooroordeeld is dan mensen, wijst de kandidaat af die jij na het gesprek het beste vond. Je kunt niet precies uitleggen waarom de tool hem afwees. Volg je de tool of je eigen oordeel?`,
    crux: `De aanname dat jouw gevoel eerlijker is, is precies wat hier wankelt: jouw klik met die kandidaat zit waarschijnlijk vol onbewuste voorkeur. De andere kant is even sterk: een systeem dat je niet kunt navragen mag niet het laatste woord hebben over iemands baan, en jij draagt straks de verantwoordelijkheid, niet de tool. De crux: vertrouw je een meetbaar minder bevooroordeeld oordeel dat je niet kunt navertellen, of je eigen oordeel dat je wel kunt navertellen maar dat aantoonbaar gekleurd is? Vraag door: wat zou je tegen de afgewezen kandidaat zeggen, en wat als de tool er later naast bleek te zitten?`,
  },
  {
    id: "vertrouwen-7",
    nr: 34,
    thema: "vertrouwen",
    type: "open-vraag",
    tekst: `Noem een keer dat je twijfelde of een collega het AI-werk wel echt had nagekeken. Wat deed je toen: zelf natrekken, er iets van zeggen, of laten gaan?`,
    crux: `Deze vraag haalt een concreet moment naar boven waarop je het AI-werk van iemand anders niet helemaal vertrouwde, en dwingt je te benoemen wat je toen deed. Het ongemak zit in de keuze: mensen zeggen zelden hardop dat ze andermans werk natrekken of juist bewust laten gaan. Doorvragen: trok je het zelf na zonder iets te zeggen, en waarom koos je daarvoor? En hoe zou je het vinden als een collega dat met jouw AI-werk deed?`,
    top: true,
  },
  {
    id: "vertrouwen-8",
    nr: 35,
    thema: "vertrouwen",
    type: "open-vraag",
    tekst: `Hoeveel controle is voor jou 'genoeg' voordat je je naam onder AI-werk durft te zetten? Noem een keer dat je dat punt bewust of stiekem lager legde dan je eigenlijk verantwoord vond.`,
    crux: `Verschuift van het principe ('je moet controleren') naar de praktijk: waar trek jij de grens als de tijd dringt, en wanneer schoof die grens. Bijna iedereen legt de lat weleens lager dan hij zou verdedigen, en de winst zit in het hardop benoemen daarvan zonder oordeel. Let als begeleider op het verschil tussen 'het was echt goed genoeg' en het ongemak van iemand die toegeeft dat hij gokte en geluk had. Vraag door: wat maakte dat je die keer minder controleerde, tijdsdruk, vertrouwen in de tool, of dat niemand het toch zou checken? En legde je de lat erna echt hoger, of zei je dat alleen?`,
    top: true,
  },
  {
    id: "vertrouwen-9",
    nr: 36,
    thema: "vertrouwen",
    type: "open-vraag",
    tekst: `Wanneer vertrouwde je een AI-resultaat meer dan het oordeel van een mens, jezelf of een collega, en bleek dat achteraf terecht of juist niet? Wat deed dat met hoe je de volgende keer koos?`,
    crux: `Dwingt mensen een concreet moment te kiezen waarop ze de machine boven de mens lieten gaan, in plaats van in het algemeen te zeggen dat de mens natuurlijk het laatste woord heeft. De spannende gevallen zijn die waar het terecht was: waar de AI gelijk had en de mens ernaast zat. Let op of mensen alleen verhalen vertellen waarin de AI fout zat, want dan ontwijken ze het echte ongemak. Vraag door: durf je toe te geven dat een AI weleens een beter oordeel had dan jij, en zo ja, wat doet dat met het vertrouwen in je eigen oordeel?`,
    top: true,
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
    id: "eerlijk-1",
    nr: 46,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Een tekst door AI laten schrijven en doen alsof het je eigen woorden zijn, is gewoon misleiding. Ook als ik het zelf af en toe doe.`,
    crux: `De tweede zin is de val: wie instemt erkent dat hij het zelf ook doet. Het gesprek gaat niet over of het mag, maar over de dubbele maat. Vraag door: wat is het verschil tussen wat jij doet en wat je die collega verwijt? Zit het in de mate van bewerken, in de pretentie, of houden we onszelf gewoon een uitzondering toe?`,
  },
  {
    id: "eerlijk-2",
    nr: 47,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Wij zouden als team standaard moeten vermelden wanneer iets met AI is gemaakt.`,
    crux: `Geschikt om mensen letterlijk naar een kant van de kamer te laten lopen. Voorstanders: transparantie en vertrouwen. Tegenstanders: een verplicht stempel maakt AI verdacht, terwijl niemand meldt dat hij Google of een rekenmachine gebruikte. De crux is of melden vertrouwen schept of juist een schuldlabel plakt op normaal gereedschap.`,
  },
  {
    id: "eerlijk-3",
    nr: 48,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Iemand die zegt: ik gebruik nooit AI, geloof ik tegenwoordig niet meer.`,
    crux: `Prikkelt het thema vertrouwen vanaf de andere kant: stiekem gebruik is zo wijdverbreid dat ontkenning ongeloofwaardig wordt. Legt bloot dat onuitgesproken normen een cultuur van kleine leugentjes maken. Vraag: als 'niemand zegt het maar iedereen doet het' de norm is, wie durft dan nog eerlijk te zijn over de grens van zijn eigen kunnen?`,
    top: true,
  },
  {
    id: "eerlijk-4",
    nr: 49,
    thema: "eerlijk",
    type: "stelling",
    tekst: `Als een klant niet vraagt of we AI hebben gebruikt, hoeven we het ook niet uit onszelf te zeggen.`,
    crux: `Verschuift van interne collegialiteit naar de buitenwereld, waar geld en verwachtingen meespelen. Zwijgen is juridisch vaak prima, maar voelt het eerlijk als de klant denkt maatwerk te kopen? Onderscheid: betaalt iemand voor jouw uren, jouw oordeel, of voor een werkend resultaat? Daar hangt het antwoord aan.`,
  },
  {
    id: "eerlijk-5",
    nr: 50,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Je vermoedt dat je stagiair een opdracht volledig door AI heeft laten maken. Vraag je ernaar, dan ontkent diegene het. Wat doe je?`,
    crux: `De ijkcasus. Dwingt onderscheid tussen 'met AI' (waar precies?) en de kern: een stage gaat om leren, niet om output. Gaat het je om het AI-gebruik, om de ontkenning (de echte vertrouwensbreuk), of om wat de stagiair hier niet leert? Het ongemak: je gebruikt zelf waarschijnlijk ook AI, dus waar haal je het recht vandaan om streng te zijn?`,
    top: true,
  },
  {
    id: "eerlijk-6",
    nr: 51,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Je manager presenteert in een overleg een analyse als zijn eigen werk. Jij weet dat AI het grootste deel deed. Zeg je iets, en zo ja, tegen wie?`,
    crux: `Voegt machtsverhouding toe aan de transparantievraag. Dezelfde gedraging die bij een stagiair 'fout' heet, blijft bij een baas vaak onbesproken. Legt bloot dat onze eerlijkheidsnormen meebewegen met hierarchie. Vraag: geldt 'eerlijk over AI' alleen omhoog en zijwaarts, of ook als het je iets kan kosten?`,
  },
  {
    id: "eerlijk-7",
    nr: 52,
    thema: "eerlijk",
    type: "dilemma",
    tekst: `Een klant verbiedt AI in zijn opdracht. Jij weet dat je het met AI sneller en minstens zo goed kunt, en dat hij het verschil nooit zal zien. Houd je je aan zijn nee, of doe je wat volgens jou het beste resultaat geeft?`,
    crux: `De kern: respecteer je de autonomie van de klant over iets wat hij niet kan controleren, of je eigen oordeel over kwaliteit? 'Hij ziet het verschil toch niet' is precies het argument dat vertrouwen sloopt. Onderscheid: verbiedt hij een gereedschap, of koopt hij de zekerheid van mensenhanden? En als je zijn nee omzeilt zonder dat hij het merkt, voor wie doe je dat dan eigenlijk?`,
  },
  {
    id: "eerlijk-8",
    nr: 53,
    thema: "eerlijk",
    type: "open-vraag",
    tekst: `Wat heb je weleens door AI laten maken en als je eigen werk laten doorgaan, terwijl het eigenlijk niet klopte om dat zo te brengen?`,
    crux: `Vraagt naar een echt moment in plaats van een principe, en houdt het strak op het thema: niet wat je niet WILT maken (dat is mens-8), maar waar je de schijn van eigen werk hebt opgehouden terwijl het schuurde. Let op het verschil tussen 'iedereen doet dit' en oprecht ongemak achteraf. De plek waar iemand het toch deed verraadt waar zijn eerlijkheidsgrens in de praktijk ligt, niet in theorie.`,
  },
  {
    id: "eerlijk-9",
    nr: 54,
    thema: "eerlijk",
    type: "open-vraag",
    tekst: `Wanneer vind jij het juist prima om niet te vertellen dat er AI bij betrokken was, en wanneer voelt datzelfde zwijgen oneerlijk?`,
    crux: `Draait het thema om: niet 'wanneer stoorde het zwijgen van een ander', maar 'waar ligt mijn eigen grens tussen normaal gereedschap en misleiding'. Dwingt mensen twee concrete gevallen naast elkaar te leggen, waardoor het criterium zichtbaar wordt in plaats van het oordeel. Vraag door wat het verschil maakt: gaat het om wat de ander verwacht, om wat hij ervoor betaalt, of om hoe persoonlijk het is.`,
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
