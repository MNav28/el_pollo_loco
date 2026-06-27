/**
 * Generates the HTML template for the legal notice (Impressum) overlay.
 *
 * The template contains contact information, legal details,
 * and attribution links for external assets used in the project.
 *
 * @returns {string} The HTML markup for the Impressum overlay.
 */
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

            <h2>Impressum</h2>

            <h3>Angaben gemäß § 5 TMG</h3>

            <p>
                <b>Michael Navarro</b><br>
                Ganghoferstr. 91<br>
                81373 München
            </p>

            <h3>Kontakt</h3>

            <p>
                E-Mail: 
                <a href="mailto:m.navarro@gmx.net">
                    m.navarro@gmx.net
                </a>
            </p>

            <p>
                Quelle: e-recht24.de Impressum-Generator
            </p>

            <p>
                Die Soundeffekte stammen von 
                <a href="https://pixabay.com/sound-effects/" 
                   rel="nofollow" 
                   target="_blank">
                   Pixabay
                </a>
            </p>

            <p>
                Das Hintergrundbild stammt von 
                <a href="https://www.freepik.com" 
                   rel="nofollow" 
                   target="_blank">
                   Freepik
                </a>
            </p>

            <p>
                Die Icons kommen von 
                <a href="https://fontawesome.com/start" 
                   rel="nofollow" 
                   target="_blank">
                   Fontawesome
                </a>
                und 
                <a href="https://www.flaticon.com" 
                   rel="nofollow" 
                   target="_blank">
                   Flaticon
                </a>
            </p>

        </div>
    `;
}


/**
 * Generates the HTML template for the game controls overlay.
 *
 * Displays only the controls matching the current input device.
 *
 * @returns {string} The HTML markup for the controls overlay.
 */
function getControlTemplate() {

    const isMobileDevice = window.matchMedia("(pointer: coarse)").matches;
    let controls;
    if (isMobileDevice) {
        controls = getMobileControlsTemplate();
    } else {
        controls = getDesktopControlsTemplate();
    }

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

            <h2>Steuerung</h2>

            ${controls}

        </div>
    `;
}


/**
 * Generates desktop control instructions.
 *
 * @returns {string} Desktop controls markup.
 */
function getDesktopControlsTemplate() {
    return `

        <div class="controls-wrapper">

            <div class="controls-column">

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

        </div>

    `;
}


/**
 * Generates mobile control instructions.
 *
 * @returns {string} Mobile controls markup.
 */
function getMobileControlsTemplate() {
    return `

        <div class="controls-wrapper">

            <div class="controls-column">

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

    `;
}