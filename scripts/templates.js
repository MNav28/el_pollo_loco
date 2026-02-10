function getImpressumTemplate() {
    return `
        <div class="overlay-info-header">
            <img 
                src="./assets/img/close.svg" 
                alt="Close"
                class="overlay-info-close"
                onclick="closeInfoOverlay()"
            >
        </div>

        <div class="overlay-info-body">
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>

        <p><b>Michael Mustermann</b><br>
        Musterstr. 91<br>
        81373 Musterstadt</p>

        <h2>Kontakt</h2>
        <p>
            E-Mail: <a href="mailto:m.navarro@gmx.net">m.navarro@gmx.net</a>
        </p>

        <p>Quelle: e-recht24.de Impressum-Generator</p>
        <p>Die Soundeffekte stammen von <a href="https://pixabay.com/sound-effects/" rel="nofollow" target="_blank">Pixabay</a> </p>
        <p>Das Hintergrundbild stammt von <a href="https://www.freepik.com" rel="nofollow" target="_blank">Freepik</a> </p>
        <p>Die Icons kommen von <a href="https://fontawesome.com/start" rel="nofollow" target="_blank">Fontawesome</a> und 
            <a href="https://www.flaticon.com" rel="nofollow" target="_blank">Flaticon</a>
        </p>
        </div>
    `;
}


function getControlTemplate() {
    return `
        <div class="overlay-info-header">
            <img 
                src="./assets/img/close.svg" 
                alt="Close"
                class="overlay-info-close"
                onclick="closeInfoOverlay()"
            >
        </div>
        <div class="overlay-info-body">
        <p>platzhalter für Steuerunganleitung</p>
        </div>
    `
}