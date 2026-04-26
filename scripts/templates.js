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

        <p><b>Michael Navarro</b><br>
        Ganghoferstr. 91<br>
        81373 München</p>

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

    <h1>Steuerung</h1>

    <div class="controls-wrapper">

        <!-- DESKTOP -->
        <div class="controls-column">
            <h2>Desktop</h2>

            <div class="control-grid">

                <div class="control-row">
                    <div class="key">←</div>
                    <span>links laufen</span>
                </div>

                <div class="control-row">
                    <div class="key">→</div>
                    <span>rechts laufen</span>
                </div>

                <div class="control-row">
                    <div class="key space">⎵</div>
                    <span>springen</span>
                </div>

                <div class="control-row">
                    <div class="key">D</div>
                    <span>Flasche werfen</span>
                </div>

            </div>
        </div>

        <!-- separator -->
        <div class="controls-separator"></div>

        <!-- MOBILE -->
        <div class="controls-column">
            <h2>Mobil</h2>

            <div class="control-grid">

                <div class="control-row">
                    <img src="./assets/img/left.svg" alt="Links">
                    <span>links laufen</span>
                </div>

                <div class="control-row">
                    <img src="./assets/img/right.svg" alt="Rechts">
                    <span>rechts laufen</span>
                </div>

                <div class="control-row">
                    <img src="./assets/img/up.svg" alt="Springen">
                    <span>springen</span>
                </div>

                <div class="control-row">
                    <img src="./assets/img/throw.svg" alt="Werfen">
                    <span>Flasche werfen</span>
                </div>

            </div>
        </div>

    </div>

</div>
    `;
}
