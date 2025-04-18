$(document).ready(function(e) {

    // Globale variabele voor de *interne* pagina ID (A, B, C...)
    var pgNr = 'A';

    // ***** NIEUW: Mapping van interne ID naar leesbare URL hash naam *****
    const pageIdToHashName = {
        'A': 'home',
        'B': 'infosessies',
        'C': 'cultuur-ontspanning',
        'D': 'fotos',
        'E': 'videos',
        'F': 'info',
        'G': 'downloads',
        'H': 'contact'
    };

    // ***** NIEUW: Omgekeerde mapping (Hash naam naar interne ID) *****
    const hashNameToPageId = Object.fromEntries(
        Object.entries(pageIdToHashName).map(([key, value]) => [value, key])
    );

    // ***** AANGEPAST: Functie om pagina content en menu's bij te werken *****
    // Deze functie werkt nu met de Demo IDs
    function setPgDemo() {
        // Verberg alle content secties
        $('.pgContentDemo').css('display', 'none');
        // Toon de juiste content sectie
        $('#pg' + pgNr).css('display', 'block'); // Gebruikt nog steeds pgA, pgB...

        // Haal de label tekst op van het actieve menu item
        var activeMenuLabel = $('#MnuItmDemo' + pgNr).find('label').html() || 'Home';
        // Update de tekst in de header
        $('#actieveMnuDemo').html(activeMenuLabel);

        // Update 'active' class op menu items
        $('.menu-item-demo').removeClass('active');
        $('#MnuItmDemo' + pgNr).addClass('active');

        // Scroll naar bovenkant content area (aangepast voor demo IDs)
        var contentTop = $('#allPagesDemo').offset() ? $('#allPagesDemo').offset().top : 0;
        var headerHeight = $('#titelWebsiteDemo').outerHeight() || 0;
        $('html, body').animate({ scrollTop: contentTop - headerHeight - 10 }, 0);
    };

    // ***** NIEUW: Functie om de juiste pagina te tonen o.b.v. de URL hash *****
    function showPageFromHash() {
        var hash = window.location.hash.substring(1).toLowerCase();
        var targetPageId = 'A'; // Default naar 'A' (home)

        if (hash && hashNameToPageId[hash]) {
            targetPageId = hashNameToPageId[hash]; // Vind interne ID ('B') via hash naam ('infosessies')
        } else if (!hash) {
            // Geen hash? Zet naar default (#home). Gebruik replaceState om history niet te vervuilen.
            history.replaceState(null, null, '#' + pageIdToHashName['A']);
            targetPageId = 'A'; // Zorg dat we ook echt 'A' gebruiken
             // window.location.hash = '#' + pageIdToHashName['A']; // Alternatief dat wel hashchange triggert
             // return; // Als je bovenstaande gebruikt, stop hier
        }
        // Als hash onbekend is, blijft targetPageId 'A'

        pgNr = targetPageId; // Update globale interne ID
        setPgDemo();        // Roep de AANGEPASTE setPgDemo functie aan
    }


    // ***** AANGEPAST: Click handler voor de DEMO menu items *****
    $('div[id^="MnuItmDemo"]').on('click', function(e) { // Let op: selecteert nu MnuItmDemo...
        e.preventDefault();

        var clickedElementId = $(this).attr('id'); // bv. MnuItmDemoB
        var pageIdSuffix = clickedElementId.slice(-1).toUpperCase(); // Haal 'B' op

        // Zoek de leesbare hash naam op
        var targetHashName = pageIdToHashName[pageIdSuffix];

        if (targetHashName) {
            // Zet ALLEEN de window.location.hash
            window.location.hash = '#' + targetHashName;
            // De hashchange listener doet de rest
        } else {
            // Fallback als ID onbekend is
            window.location.hash = '#' + pageIdToHashName['A']; // Ga naar #home
        }
    });

    // ***** NIEUW: Event listener voor URL hash veranderingen *****
    $(window).on('hashchange', showPageFromHash);

    // ***** NIEUW: Roep showPageFromHash aan bij het laden van de pagina *****
    showPageFromHash();

}); // Einde $(document).ready