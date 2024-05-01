export const projectDetails = [
    {
        id: 1,
        title: "Hello World",
        description: "Primul pas în orice limbaj de programare este să înveți cum să rulezi un simplu script care afișează 'Hello, World!'. Acest lucru te introduce în sintaxa de bază și în modul de executare a codului. Această lecție servește ca introducere în mediul de dezvoltare și înțelegerea execuției unui program simplu. Prin aceasta, vei învăța sintaxa de bază a JavaScript și conceptele fundamentale ale programării, cum ar fi utilizarea stringurilor pentru comunicarea cu utilizatorul și afișarea output-ului prin intermediul consolei.",
        purpose: "Scopul este de a configura și utiliza un mediu adecvat pentru dezvoltare, cum ar fi Visual Studio Code sau un editor online, și de a te familiariza cu rularea scripturilor direct din consolă sau terminal. Această lecție pune bazele înțelegerii mai avansate a programării, pregătindu-te pentru concepte ulterioare precum variabilele, condițiile, buclele și structurile de date.",
        steps: [
            "Creați un fișier HTML și includeți un script JavaScript.",
            "Scrieți codul necesar pentru a afișa 'Hello, World!' în consola browserului."
        ]
    },
    {
        id: 2,
        title: "Calculator Simplu",
        description: "Această lecție te învață să creezi un calculator simplu capabil să efectueze operații matematice de bază cum ar fi adunarea, scăderea, înmulțirea și împărțirea. Vei învăța să procesezi inputuri de la utilizator și să afișezi rezultatele folosind JavaScript. Prin această aplicație, vei deveni familiar cu conceptele de variabile și funcții, și vei înțelege cum să folosești operatorii matematici într-un program. De asemenea, lecția explică gestionarea erorilor simple și validarea datelor de intrare, asigurându-te că calculatorul poate gestiona diverse tipuri de inputuri fără a se prăbuși.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități fundamentale în manipularea datelor de intrare și afișarea rezultatelor, oferind totodată o introducere în sintaxa și logica necesară pentru scrierea funcțiilor. Acest proiect pregătește terenul pentru înțelegerea structurilor mai complexe de control, cum ar fi buclele și condițiile, care sunt esențiale în dezvoltarea software.",
        steps: [
            "Creați un fișier HTML și includeți un script JavaScript pentru calculator.",
            "Scrieți funcții JavaScript care primesc inputuri de la utilizator, efectuează calcule și afișează rezultatele.",
            "Asigurați-vă că calculatorul poate gestiona inputuri neașteptate fără erori, folosind validare simplă."
        ]
    },
    {
        id: 3,
        title: "Joc de Ghicit Numărul",
        description: "În această lecție, vei învăța să dezvolți un joc interactiv unde utilizatorii trebuie să ghicească un număr aleatoriu generat de computer. Proiectul îți va prezenta concepte importante precum buclele, condițiile și generarea de numere aleatorii. Vei deveni familiar cu structurile de control if-else și cu buclele, care sunt esențiale pentru crearea de logici decizionale în programe. De asemenea, această activitate te va ajuta să înțelegi cum să captezi și să procesezi inputurile utilizatorilor și cum să răspunzi la acestea într-un mod dinamic și interactiv.",
        purpose: "Scopul acestei lecții este de a îmbunătăți înțelegerea și abilitățile de utilizare a structurilor de control și de a gestiona interacțiuni simple cu utilizatorul. Jocul de ghicit numărul introduce conceptul de aleatoriu în programare și îți dezvoltă capacitatea de a construi logici de joc simple, pregătindu-te pentru proiecte mai complexe care implică interactivitate și logică condițională avansată.",
        steps: [
            "Generați un număr aleatoriu între 1 și 100 folosind JavaScript.",
            "Scrieți codul care permite utilizatorului să introducă un număr și să verifice dacă acesta este egal cu numărul generat.",
            "Adăugați feedback pentru utilizator pentru a-l ghida cum să ajusteze ghicirile pe baza răspunsurilor anterioare."
        ]
    },
    {
        id: 4,
        title: "Galerie de Imagini",
        description: "Această lecție este dedicată creării unei galerii de imagini interactive, unde utilizatorii pot naviga prin diferite imagini folosind butoane de navigare. Vei învăța cum să manipulezi elementele DOM (Document Object Model) în JavaScript pentru a controla elementele vizuale ale paginii web. Proiectul îți va oferi oportunitatea de a te familiariza cu gestionarea evenimentelor, cum ar fi clicurile pe butoane, și cu schimbarea dinamică a conținutului afișat pe pagina web. De asemenea, vei explora cum să organizezi și să accesezi elementele media, precum imagini, într-o structură de date adecvată, facilitând manipularea și actualizarea acestora într-un mod eficient.",
        purpose: "Scopul acestei lecții este de a dezvolta competențe în manipularea DOM-ului și în gestionarea evenimentelor utilizator în JavaScript. Prin crearea unei galerii de imagini, vei învăța tehnici esențiale pentru dezvoltarea interfețelor utilizator și pentru crearea unei experiențe interactive și plăcute pentru utilizatori. Acest proiect pregătește terenul pentru lucrul cu aplicații web mai complexe care implică o interactivitate avansată și manipularea avansată a elementelor vizuale.",
        steps: [
            "Creați un array de imagini și stocați-l în JavaScript.",
            "Implementați funcționalitatea de afișare a unei imagini la un moment dat într-un container specific pe pagina web.",
            "Adăugați butoane pentru navigarea înainte și înapoi, care la activare, schimbă imaginea afișată.",
            "Asigurați funcționalitatea de ciclare a imaginilor, astfel încât la atingerea ultimei imagini, navigarea înainte să revină la prima imagine și invers."
        ]
    },
    {
        id: 5,
        title: "Aplicație de Votare",
        description: "Proiectul 'Aplicație de Votare' îți oferă oportunitatea de a construi o interfață simplă unde utilizatorii pot vota între diferite opțiuni. Această lecție te va introduce în gestionarea stării aplicației și în manipularea evenimentelor de la utilizator pentru a actualiza această stare. Vei învăța să construiești formulare web, să gestionezi inputurile utilizatorilor și să actualizezi UI-ul (User Interface) în funcție de aceste inputuri. De asemenea, acest proiect îți va dezvolta abilitățile de a lucra cu array-uri și obiecte pentru stocarea datelor de vot și va explora modul în care poți folosi aceste structuri de date pentru a afișa rezultatele votului în timp real.",
        purpose: "Scopul acestei lecții este de a îmbunătăți înțelegerea interactivității și a dinamicii aplicațiilor web, prin manipularea datelor introduse de utilizatori și actualizarea corespunzătoare a interfeței. Aceasta va pune bazele pentru dezvoltarea abilităților în gestionarea mai complexă a stării în aplicații mai sofisticate și va oferi experiență practică în implementarea logicii condiționale și a buclelor pentru procesarea datelor.",
        steps: [
            "Construiți o interfață simplă de utilizator cu butoane sau radio buttons pentru opțiunile de vot.",
            "Implementați logica JavaScript pentru a captura voturile utilizatorilor și pentru a actualiza numărul total de voturi pentru fiecare opțiune în timp real.",
            "Stocați și gestionați voturile folosind o structură de date adecvată, cum ar fi un obiect sau un array.",
            "Adăugați funcționalități pentru a afișa rezultatele votului pe măsură ce utilizatorii votează și pentru a recalcula procentele fiecărei opțiuni.",
            "Asigurați-vă că aplicația poate gestiona cazuri multiple de utilizatori, simulând un mediu de vot real."
        ]
    },
    {
        id: 6,
        title: "To-do List App",
        description: "În această lecție, vei crea o aplicație pentru gestionarea sarcinilor, unde utilizatorii pot adăuga, marca și șterge elemente dintr-o listă de activități de făcut. Această aplicație îți va demonstra cum să gestionezi starea complexă a unei aplicații și cum să actualizezi interfața utilizator în funcție de acțiunile utilizatorilor. Vei învăța cum să utilizezi evenimentele DOM (Document Object Model) și să manipulezi elementele paginii web pentru a adăuga, actualiza și șterge elemente într-o listă dinamică. Prin implementarea acestui proiect, vei dobândi abilități esențiale în gestionarea datelor și în construirea unor interfețe interactive și funcționale.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități avansate în gestionarea stării aplicației și în manipularea interacțiunilor utilizatorului. Prin construirea unei aplicații de listare a sarcinilor, vei învăța cum să gestionăm eficient datele și cum să reacționăm la evenimentele utilizatorului într-un mod dinamic și eficient. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor de state management și pentru construirea unor aplicații web mai complexe și mai scalabile.",
        steps: [
            "Construiți o interfață pentru adăugarea de noi sarcini, afișarea acestora și ștergerea lor din listă.",
            "Implementați logica JavaScript pentru a adăuga noi sarcini în listă și pentru a le șterge pe cele completate.",
            "Asigurați funcționalitatea de marcări a sarcinilor ca și completate și de revenire la starea inițială.",
            "Utilizați un sistem de stocare pentru a menține lista de sarcini persistentă între sesiuni."
        ]
    },
    {
        id: 7,
        title: "Blog Simplu",
        description: "În această lecție, vei construi un blog simplu, care permite utilizatorilor să creeze, să editeze și să șteargă articole. Acest proiect te va introduce în conceptele de CRUD (Create, Read, Update, Delete) și în lucrul cu o bază de date simplă pentru stocarea articolelor. Vei învăța cum să construiești o interfață de utilizator pentru afișarea articolelor și cum să implementezi funcționalități pentru adăugarea și editarea acestora. De asemenea, vei învăța despre gestionarea sesiunilor utilizatorilor și despre securitatea înregistrărilor, inclusiv autentificarea și autorizarea utilizatorilor.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea unei aplicații web complexe și funcționale. Prin construirea unui blog simplu, vei învăța conceptele esențiale ale interacțiunii cu bazele de date și ale gestionării sesiunilor și securității utilizatorilor într-un mediu web. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor de bază ale dezvoltării web backend și pentru construirea unor aplicații mai complexe în viitor.",
        steps: [
            "Creați o interfață de utilizator pentru afișarea articolelor existente și pentru adăugarea de articole noi.",
            "Implementați un sistem de gestionare a utilizatorilor, inclusiv autentificare și autorizare.",
            "Conectați-vă la o bază de date pentru a stoca și gestiona articolele și utilizatorii.",
            "Adăugați funcționalități pentru editarea și ștergerea articolelor existente.",
            "Asigurați funcționalitatea de securitate pentru protejarea datelor și a operațiunilor utilizatorilor."
        ]
    },
    {
        id: 8,
        title: "Chat Simplu",
        description: "În această lecție, vei crea un chat simplu, care permite utilizatorilor să trimită și să primească mesaje în timp real. Acest proiect te va familiariza cu conceptele de comunicare în timp real prin intermediul WebSocket-urilor și te va introduce în dezvoltarea aplicațiilor de chat. Vei învăța cum să configurezi un server WebSocket și cum să îți conectezi aplicația la acesta. De asemenea, vei explora modul în care poți manipula și actualiza DOM-ul (Document Object Model) în timp real pentru a afișa mesajele noi și pentru a le trimite către alți utilizatori.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor web în timp real și de a înțelege conceptele de comunicare bidirecțională. Prin construirea unui chat simplu, vei învăța cum să implementezi WebSocket-uri și să gestionezi evenimentele de trimitere și primire a mesajelor în timp real. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor avansate de comunicare în timp real și pentru dezvoltarea ulterioară a aplicațiilor web interactiv.",
        steps: [
            "Configurați un server WebSocket folosind o bibliotecă sau un framework JavaScript, cum ar fi Socket.IO.",
            "Conectați-vă aplicația client la serverul WebSocket și gestionați evenimentele de trimitere și primire a mesajelor.",
            "Implementați logica JavaScript pentru a actualiza DOM-ul în timp real pentru afișarea mesajelor noi.",
            "Adăugați funcționalități pentru autentificare și gestionarea utilizatorilor în cadrul chatului.",
            "Asigurați funcționalitatea de securitate pentru protejarea datelor utilizatorilor și a mesajelor trimise."
        ]
    },
    {
        id: 9,
        title: "Joc de Tip Quiz",
        description: "În această lecție, vei crea un joc de tip quiz, care va testa cunoștințele utilizatorilor într-un anumit domeniu. Acest proiect îți va oferi oportunitatea de a crea întrebări și răspunsuri multiple, de a le afișa utilizatorilor și de a-i evalua pe baza răspunsurilor date. Vei învăța cum să gestionăm starea jocului și cum să oferi feedback în timp real utilizatorilor. De asemenea, vei explora metode pentru stocarea și gestionarea întrebărilor și răspunsurilor și pentru calcularea scorului final al utilizatorului.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în crearea interacțiunilor complexe cu utilizatorii și în gestionarea stării aplicației. Prin construirea unui joc de tip quiz, vei învăța cum să implementezi logica de întrebare-răspuns și să oferi feedback în timp real utilizatorilor. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor de gestionare a stării în aplicațiile web și pentru dezvoltarea ulterioară a interfețelor interactive.",
        steps: [
            "Creați o bază de date cu întrebări și răspunsuri pentru jocul de quiz.",
            "Implementați logica JavaScript pentru a afișa întrebările și pentru a gestiona răspunsurile utilizatorului.",
            "Asigurați funcționalitatea de evaluare a răspunsurilor și de calculare a scorului final al utilizatorului.",
            "Adăugați funcționalități pentru a oferi feedback în timp real utilizatorilor și pentru a le afișa scorul final.",
            "Asigurați funcționalitatea de gestionare a stării jocului și de revenire la starea inițială pentru un nou joc."
        ]
    },
    {
        id: 10,
        title: "Aplicație de Rezervări",
        description: "În această lecție, vei crea o aplicație de rezervări, care permite utilizatorilor să facă rezervări pentru diverse servicii sau activități. Acest proiect îți va oferi oportunitatea de a implementa un sistem de autentificare și de gestionare a sesiunilor utilizatorilor, precum și de a crea un interfețe interactive pentru alegerea și programarea rezervărilor. Vei învăța cum să stoci și să gestionezi datele rezervărilor, cum să oferi feedback în timp real utilizatorilor și cum să gestionezi fluxul de date între aplicație și server.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor web interactive și funcționale, care implică gestionarea utilizatorilor și a datelor. Prin construirea unei aplicații de rezervări, vei învăța cum să implementezi autentificarea utilizatorilor și cum să gestionezi eficient datele rezervărilor. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor de gestionare a sesiunilor și a fluxului de date în aplicațiile web.",
        steps: [
            "Creați un sistem de autentificare pentru utilizatori și implementați gestionarea sesiunilor.",
            "Construiți o interfață de utilizator pentru alegerea serviciilor și programarea rezervărilor.",
            "Stocați și gestionați datele rezervărilor într-o bază de date sau alt sistem de stocare.",
            "Implementați funcționalități pentru oferirea feedback-ului în timp real utilizatorilor și pentru confirmarea rezervărilor.",
            "Asigurați funcționalitatea de gestionare a fluxului de date între client și server."
        ]
    },
    {
        id: 11,
        title: "Single Page Application",
        description: "În această lecție, vei crea o aplicație web de tip Single Page Application (SPA), care oferă o experiență de navigare fără încărcare constantă a paginilor. Acest proiect te va familiariza cu conceptele de routing și de gestionare a stării într-o aplicație SPA. Vei învăța cum să configurați și să utilizați un framework sau o bibliotecă JavaScript pentru a gestiona rutele aplicației și pentru a actualiza conținutul în funcție de ruta accesată. De asemenea, vei explora metode pentru a gestiona starea aplicației și pentru a menține datele între diferitele rute ale SPA-ului.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor web moderne și interactive, care utilizează o singură pagină. Prin construirea unei aplicații SPA, vei învăța cum să gestionezi eficient rutele și starea aplicației, oferind o experiență de utilizare mai fluidă și mai rapidă. Acest proiect oferă o bază solidă pentru înțelegerea conceptelor de routing și de gestionare a stării în SPA-uri și pentru dezvoltarea ulterioară a aplicațiilor web complexe și scalabile.",
        steps: [
            "Configurați un framework sau o bibliotecă JavaScript pentru gestionarea rutelor aplicației.",
            "Definiți diferitele rute ale aplicației și implementați componente pentru fiecare rută.",
            "Gestionați starea aplicației și mențineți datele între diferitele componente și rute ale SPA-ului.",
            "Implementați funcționalități pentru navigarea între rutele aplicației și pentru actualizarea conținutului în funcție de ruta accesată.",
            "Asigurați funcționalitatea de gestionare a stării și de revenire la starea inițială pentru un SPA nou încărcat."
        ]
    },
    {
        id: 12,
        title: "Platformă de e-Commerce",
        description: "În această lecție, vei crea o platformă de e-commerce, care permite utilizatorilor să navigheze și să cumpere produse online. Acest proiect te va familiariza cu conceptele de dezvoltare a unei aplicații web de comerț electronic, inclusiv gestionarea produselor, a coșului de cumpărături și a comenzilor. Vei învăța cum să implementați funcționalități esențiale pentru o platformă de e-commerce, cum ar fi afișarea produselor, adăugarea lor în coșul de cumpărături și finalizarea unei comenzi. De asemenea, vei explora metode pentru a gestiona stocurile, plățile online și securitatea datelor utilizatorilor.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor web de comerț electronic și de a înțelege conceptele esențiale ale unui sistem de e-commerce. Prin construirea unei platforme de e-commerce, vei învăța cum să gestionezi eficient produsele, comenzile și plățile online, oferind o experiență de cumpărături sigură și eficientă utilizatorilor. Acest proiect oferă o bază solidă pentru dezvoltarea ulterioară a aplicațiilor web de comerț electronic și pentru explorarea unor concepte avansate, cum ar fi securitatea și scalabilitatea.",
        steps: [
            "Configurați un mediu de dezvoltare pentru aplicația de e-commerce și alegeți un framework sau o platformă de dezvoltare.",
            "Definiți structura de bază a aplicației, inclusiv modelele de date pentru produse, utilizatori și comenzile lor.",
            "Implementați funcționalități pentru afișarea produselor, adăugarea lor în coșul de cumpărături și gestionarea comenzilor utilizatorilor.",
            "Asigurați funcționalitatea de gestionare a stocurilor, procesarea plăților online și securitatea datelor utilizatorilor.",
            "Finalizați aplicația prin testare și optimizare, asigurându-vă că oferă o experiență de cumpărături fluentă și sigură."
        ]
    },
    {
        id: 13,
        title: "Aplicație de Recunoaștere a Imaginilor",
        description: "În această lecție, vei crea o aplicație de recunoaștere a imaginilor, care utilizează tehnici de învățare automată pentru a identifica și a clasifica obiectele din imagini. Acest proiect te va familiariza cu conceptele de învățare automată și de prelucrare a imaginilor și te va introduce în lumea complexă a viziunii artificiale. Vei învăța cum să utilizați biblioteci și framework-uri populare pentru învățarea automată, cum ar fi TensorFlow sau PyTorch, și cum să pregătiți datele, să construiți și să antrenați modelele de recunoaștere a imaginilor. De asemenea, vei explora metode pentru evaluarea performanței modelelor și pentru integrarea acestora într-o aplicație web interactivă.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor bazate pe viziune artificială și în înțelegerea conceptelor esențiale ale recunoașterii imaginilor. Prin construirea unei aplicații de recunoaștere a imaginilor, vei învăța cum să utilizezi tehnici de învățare automată pentru a rezolva probleme complexe de prelucrare a imaginilor și pentru a identifica obiectele din imagini. Acest proiect oferă o bază solidă pentru dezvoltarea ulterioară a aplicațiilor bazate pe viziune artificială și pentru explorarea unor concepte avansate, cum ar fi clasificarea și detecția obiectelor în imagini.",
        steps: [
            "Pregătiți datele pentru antrenarea modelelor de recunoaștere a imaginilor și asigurați-vă că sunt etichetate corect.",
            "Alegeți un framework sau o bibliotecă pentru învățarea automată, precum TensorFlow sau PyTorch, și configurați mediul de dezvoltare.",
            "Construiți și antrenați modelele de recunoaștere a imaginilor folosind datele pregătite anterior.",
            "Evaluați performanța modelelor și optimizați-le pentru a obține rezultate mai precise și mai rapide.",
            "Integrați modelele antrenate într-o aplicație web interactivă și testați funcționalitatea lor în cadrul aplicației."
        ]
    },
    {
        id: 14,
        title: "Dashboard de Vizualizare a Datelor",
        description: "În această lecție, vei crea un dashboard interactiv pentru vizualizarea și interpretarea datelor. Acest proiect te va introduce în conceptele de vizualizare a datelor și de dezvoltare a interfețelor interactive pentru analiza datelor. Vei învăța cum să utilizați biblioteci și framework-uri populare pentru vizualizarea datelor, cum ar fi D3.js sau Chart.js, și cum să construiți grafice și diagrame pentru a reprezenta diferitele aspecte ale datelor. De asemenea, vei explora metode pentru a filtra și a interoga datele, pentru a oferi o experiență de vizualizare personalizată și interactivă.",
        purpose: "Scopul acestei lecții este de a dezvolta abilități practice în dezvoltarea aplicațiilor de vizualizare a datelor și de a înțelege conceptele esențiale ale vizualizării datelor. Prin construirea unui dashboard de vizualizare a datelor, vei învăța cum să interpretezi și să reprezinți eficient datele în grafice și diagrame, oferind o perspectivă mai clară și mai cuprinzătoare asupra informațiilor. Acest proiect oferă o bază solidă pentru dezvoltarea ulterioară a aplicațiilor de analiză și raportare a datelor și pentru explorarea unor concepte avansate, cum ar fi integrarea interactivității și a funcționalităților de filtrare și interogare.",
        steps: [
            "Pregătiți datele pentru vizualizare, asigurându-vă că sunt structurate și curate.",
            "Alegeți un framework sau o bibliotecă pentru vizualizarea datelor, precum D3.js sau Chart.js, și configurați mediul de dezvoltare.",
            "Construiți grafice și diagrame pentru a reprezenta diferitele aspecte ale datelor, cum ar fi tendințele, distribuțiile și relațiile.",
            "Implementați funcționalități pentru filtrarea și interogarea datelor, pentru a oferi o experiență de vizualizare personalizată și interactivă.",
            "Finalizați dashboard-ul prin testare și optimizare, asigurându-vă că oferă o reprezentare precisă și ușor de înțeles a datelor."
        ]
    }    
];