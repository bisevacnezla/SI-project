
var data = [{
    grupa:"Alpha",
    opis: ["Backend sa prve četiri iteracije je urađen.", 
    "Većina backenda je urađena (kod napisan, unit testovi napravljeni, pushano, testirano i mergano sa develop branchom).",
    "Swagger file je pripremljen za urađen backend, ali još nije dovršen dok se čitav backend ne uradi.",
    "Mali dio frontenda je napravljeno, u bliskoj budućnosti će se više raditi na tome."]
},{
    grupa:"Beta",
    opis:["Napravljena je stranica za pregled issue-a po kategorijama sa strane studenta.",
    "Napravljena je stranica za kreiranje issue-a.",
    "Napravljena je stranica za Frequently Asked Issues i kreiranje FAI.",
    "Backend napravljen za dodavanje i dobavljanje poruka, issues-a, frequentIssue-a, kategorija u bazu/ iz baze.",
    "Swagger dokumentacija APIja."]
},{
    grupa:"Charlie",
    opis: ["Napravljena početna forma za kreiranje ispita.",
    "Napravljena forma za kreiranje ispita.",
    "Napravljena validacija podataka na formi za kreiranje ispita.",
    "Napravljena forma za pregled kreiranih ispita.",
    "Napravljeni linkovi za dugmad za prebacivanje između stranica.",
    "Povezano sa bazom podataka.",
    "Napisan API /ispiti.",
    "Dokumentovani API-ji na swagger-u."]
},{
    grupa:"Delta",
    opis: ["Napravljena lista predmeta.", "Napravljena forma za prikaz predmeta.",
    "Napravljena forma za konačnu ocjenu.", "Napravljena forma za prikaz zadaća, progresbar.",
    "Napravljeni linkovi za dugmad za prebacivanje između stranica.",
    "Povezano sa bazom podataka."]
},{
    grupa:"Echo",
    opis:["Napravljena početna forma (kao meni za prelazak u druge forme).",
    "Napravljena forma za unos željenih termina za nastavno osoblje.",
    "Kreirana forma za prikaz željenih termina članova nastavnog osoblja.",
    "Kreirana forma za unos krajnjeg roka unosa i promjene slobodnih termina nastavnog osoblja.",
    "Povezano sa bazom podataka.","Dokumentovani API-ji na swaggeru.",
    "Implementirana metoda za provjeru preklapanja studentskih grupa unutar termina predavanja.",
    "Implementirana metoda za računanje Fitness levela hromosoma",
    "Implementirana metoda za provjeru zadovoljenja opreme prostorije.",
    "Implementirana metoda za provjeru zadovoljenja minimalnog kapaciteta prostorije."]
},{
    grupa:"Fox",
    opis:["Povezana tabela studenti sa Apijem iz beckenda.",
    "Ispravljen navbar na stranici predmeta i dodan podmeni za unos podataka.",
    "Napravljena stranica za unos prisustva.",
    "Na početnoj stranici dodana poruka dobrodošlice.",
    "Na backendu napravljeni apiji za tabelu studenti i apiji za početnu stranicu.",
    "Napravljena konekcija sa bazom.",
    "Dokumentovani API-ji na swagger-u i didani na backendu."]
},{
    grupa:"Golf",
    opis:["Postavljena je konekcija na bazu.","Navigacija kroz cikluse, odsjeke i semestre.",
    "Pregled stranice predmeta (mn.)", "Kreiran Swagger dokument."]
},{
    grupa:"Hotel",
    opis:["Dodana stranica za profesorove ankete.",
    "Dodan unos svih podataka o anketi (bez pitanja).",
    "Dodano smještanje osnovnih podataka o anketi u bazu podataka.",
    "Napravljeno odbrojavanje isteka roka za popunjavanje ankete na stranici za popunjavanje.",
    "Na stranici rezultata prikazan datum isteka roka za popunjavanja."]
},{
    grupa:"Juliet",
    opis:["Napravljen dio backend-a .",
    "Napravljen Login.",
    "Napravljene 3 osnovne komponente za frontend.",
    "Dodane funkcionalnosti  real time slanja poruka, primanje poruka, kreiranje chatova.",
    "Napravljen chatbot koji odgovara na zahtjeve za izvještajima sa predmeta."]
},{
    grupa:"Kilo",
    opis:["Kreiranje zadaće.","Ažuriranje zadaće.", "Brisanje zadaće."]
},{
    grupa:"Mike",
    opis:["Omogućeno kreiranje projektne grupe.",
    "Omogućen prikaz projekata studenta i asistenta.",
    "Kreiran početni meni."]
},{
    grupa:"Oscar",
    opis:["Dodano 20 novih privilegija.",
    "Napravljen API koji provjerava da li uloga ima određenu privilegiju.",
    "Napravljen API koji vraća nazive svih uloga iz baze podataka.",
    "Napravljen API koji vraća nazive svih privilegija iz baze podataka.",
    "Prelazak sa lokalne na zajedničku bazu podataka.",
    "Generalni refaktoring i ispravke koda.",
    "Dodan dio koda koji kupi sve APIje iz projekta i dokumentuje ih na swagger UI-u."]
},{
    grupa:"Romeo",
    opis:["Urađen HTML i CSS za login page.",
    "Urađena validacija podataka unesenih u input polja pri loginu.",
    "Urađena uspostava pocetnih spring boot security klasa."]
},{
    grupa:"Siera",
    opis:["Učitavanje predmeta koje student trenutno sluša.",
    "Učitavanje predmeta koje je student slušao u prethodnim godinama.",
    "Učitavanje i pregled ličnih i kontakt podataka studenta."]
},{
    grupa:"Tango",
    opis:["Dodan swagger.", "Dodano polje za unos teksta komentara.",
    "Dodano dugme za objavu komentara.",
    "Dodan prikaz komentara u formi liste."]
},{
    grupa:"Uniform",
    opis:["Dodan swagger.", "Prikaz studentovog rasporeda.","Prikaz grupa za predmet."]
}];


export default data;