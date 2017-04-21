# tm-widgets

Libreria per l'inserimento di widget relativi alla rete di stazioni amatoriali TorinoMeteo in siti esterni.

Questa libreria è stata sviluppata per venire incontro agli utenti che non hanno dimestichezza o non hanno la possibilità di fruire direttamente
dei dati messi a disposizion tramite [web service](https://www.torinometeo.org/api-realtime/).

Questa libreria è stata sviluppata seguendo una linea guida principale: fornire un widget quanto più puro (non stilizzato) possibile.
Questo per permettere un elevato grado di personalizzazione e stilizzazione agli utenti. Forniremo poi degli snippet css già pronti per l'utilizzo,
come fossero dei temi, per facilitare ulteriormente gli utenti che non volessero personalizzazioni elevate.

Questo significa che l'output di questa libreria sarà un html puro, con molte classi definite sugli elementi in modo da permettere una facile personalizzazione.

## Requirements

tm-widgets richiede necessariamente una versione di jQuery >= 1.14 già caricata nella pagina. In caso contrario nessun widget verrà renderizzato e comparirà un errore nella console.

## Utilizzo

Includere jQuery nel documento, ad esempio

    <script
      src="https://code.jquery.com/jquery-2.2.4.min.js"
      integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
      crossorigin="anonymous"></script>

Includere tm-widgets (il file `dist/tm-widgets.min.js`)

    <script src="path/to/dist/tm-widgets.min.js"></script>

Inserire all'iterno della pagina come qualunque altro tag l'elemento `<tmrealtime station="id-stazione" />`

    <div class="bla bla">
      <tmrealtime station="torino-regio-parco" />
    </div>

Non è richiesto alcun ulteriore passaggio. La libreria provvederà a parserizzare il documento html (quando è pronto), e sostituirà i tag
`tmrealtime` con il widget opportuno.

## Attributi

Il tag `tmrealtime` può ricevere attributi che permettono di personalizzare il widget. Un solo attributo è obbligatorio: `station`,
perché definisce la stazione di riferimento per i dati

Vediamo quindi tutti gli attributi:

### station

Obbligatorio.

Rappresenta l'id della stazione di riferimento. Per sapere quali ID sono disponibili, fare riferimento al sito [torinometeo.org](https://www.torinometeo.org), nelle pagine di dettaglio delle stazioni, ad esempio [https://www.torinometeo.org/realtime/torino-regio-parco](https://www.torinometeo.org/realtime/torino-regio-parco) prendete la parte finale dell'url, in questo caso `torino-regio-parco`

### onReady

Opzionale.

Permette di definire una funzione (il nome della funzione anche con namespace se necessario, es 'window.miooggetto.miafunzione') che viene eseguita quando viene completata la renderizzazione del widget. Tale funzione riceverà come argomento l'oggetto jQuery wrapper del widget, e come contesto l'oggetto `window`

### datetimeFormat

Opzionale.

Formato del datetime dell'ultima rilevazione, default: GG mese AAAA HH:MM, esempio: 21 aprile 2017 10:34
I formati disponibili sono tutti quelli masticati da momentjs, e li trovi [qui](https://momentjs.com/docs/#/displaying/format/)

## Etichette

Le etichette dei dati sono tutte personalizzabili come attributi. E' possibile anche utilizzare tag html, vedere nella directory demo ad esempio l'utilizzo di icone weathericons.

### lastMeasureLabel

Opzionale.

Default: 'ultima rilevazione'

### temperatureLabel

Opzionale.

Default: 'temperatura'

### rhLabel

Opzionale.

Default: 'umidità relativa'

### pressureLabel

Opzionale.

Default: 'pressione'

### windLabel

Opzionale.

Default: 'vento'

### rainRateLabel

Opzionale.

Default: 'intensità precipitazioni'

### rainLabel

Opzionale.

Default: 'accumulo precipitazioni'

## Stili

Ogni elemento del widget è corredato da una o più classi css che vi permettono di ottenere una stilizzazione ottimale per il contesto in cui il widget sarà inserito. Inoltre ci sono alcune classi dinamiche (che dipendono dai valori):

- l'elemento che racchiude il valore di temperatura può avere una tra le seguenti classi: `tm-temp-cold` (t < 10), `tm-temp-warm` (10 <= t < 20), `tm-temp-hot` (t > 20)
- l'elemento che racchiude la direzione del vento può avere una tra le seguenti classi:
    - direction-up (337, 23]
    - direction-up-left (23, 68]
    - direction-left (68, 113]
    - direction-down-left (113, 158]
    - direction-down (158, 202]
    - direction-down-right (202, 248]
    - direction-right (248, 293]
    - direction-up-right (293, 337]

  Questo vi consente ad esempio di utilizzare icone di direzione (come fatto nella demo). Il significato degli intervalli, qualora vi fosse oscuro, lo trovate [qui](https://it.wikipedia.org/wiki/Intervallo_(matematica))

## Problemi, Bug

Se riscontrati malfunzionamenti, bug e quant'altro, riportateli nella pagina degli [issues](https://github.com/TorinoMeteo/tm-widgets/issues) cercando di fornire il maggior numero di informazioni possibile, sopratturro ** sistema operativo** e **browser**, più eventuali output in console.

Tenete presente che questa libreria è stata sviluppata per browser moderni e che rispettano i normali standar web. Non intendo supportare browser obsoleti quali IE9, IE8 etc...

## Sviluppo

Clonare il repository:

    git clone https://github.com/TorinoMeteo/tm-widgets.git

Installare le dipendenze

   $ cd tm-widgets
   $ npm install

Lanciare il server di sviluppo:

  $ npm run dev

Aprire il file `demo/basic.html` e switchare i commenti delle seguenti linee in modo da avere:

    <script src="/dist/tm-widgets.min.js"></script><!-- dev -->
    <!-- <script src="../dist/tm-widgets.min.js"></script> -->

A questo punto potete visitare http://localhost:8080/demo/basic.html

La pagina demo caricherà la libreria js compilata al volo da webpack. Ogni modifica alla libreria acuserà una re-compilazione, quindi vi sarà
sufficiente ricaricare la pagina per vedere le modifiche.

Altri comandi:

|`npm run <script>`|Descrizione|
|------------------|-----------|
|`lint`|Controlla la sintassi del codice con `eslint`.|
|`clean`|Elimina la directory `dist`.|
|`dev`|Serve la libreria all'indirizzo http://localhost:8080/dist/tm-widgets.min.js.|
|`compile`|Compila la libreria (`~/dist` by default).|
|`deploy`|Esegue lint, clean e compila la libreria con profilo "produzione".|
