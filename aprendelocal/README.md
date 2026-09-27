# AprendeLocal · intro de marca

Pieza de 25 segundos dibujada en SVG y animada por código. Es un solo archivo, `intro.html`, sin librerías externas salvo Google Fonts. Tiene dos formatos: 16:9 a 1920×1080 y 9:16 a 1080×1920.

La escena es una función del tiempo: cada cuadro se calcula para su segundo exacto. Por eso se puede pausar, arrastrar la barra, cambiar de formato en cualquier momento y exportar cuadro a cuadro sin perder precisión.

## Cómo verla

Abrir `intro.html` en un navegador con conexión (las fuentes vienen de Google Fonts).

* Botones: Pausa o Reproducir, Reiniciar, barra de tiempo, 16:9 o 9:16.
* Teclado: espacio reproduce o pausa, R reinicia, las flechas avanzan o retroceden 0,1 s.
* `?formato=9x16` abre el formato vertical.
* `?t=12.5` abre la pieza detenida en ese segundo, útil para revisar un plano.
* `?limpio` oculta los controles y ajusta el lienzo a la ventana, para grabar.
* `?consulta=nombresMapuzugun,fotoEstudiantes` enciende los elementos sujetos a consulta. Existe solo para mostrarlos durante la consulta misma.

## Cómo exportar el video

Grabar la pantalla pierde cuadros. El exportador calcula y fotografía cada cuadro:

```
npm i playwright
npx playwright install chromium
node aprendelocal/exportar.mjs 16x9
node aprendelocal/exportar.mjs 9x16
```

Deja 750 cuadros PNG por formato en `aprendelocal/cuadros/` (30 por segundo; el segundo argumento cambia el ritmo). Si ffmpeg está instalado, arma además el MP4 en H.264. La música y el sonido se montan después en el editor, siguiendo las marcas de tiempo de abajo.

## Qué se tomó del repositorio AprendeLocal

1. **Logo.** Las curvas exactas de `src/frontend/src/shared/components/ui/AprendeLocalLogo.tsx`: el monte, la palabra y el punto de la «o», sin tocar un solo punto. Se usan las dos variantes oficiales del componente: horizontal en 16:9 y apilada en 9:16. El color es la constante `CREMA` de ese archivo, #E4DED2.
2. **Especies.** Nombres científicos y nombres en mapuzugun del catálogo `src/frontend/src/modules/biodiversidad/nativas.ts`.
3. **Coordenadas.** El Villarrica figura en `data/araucania/pois.json` a 39,42° S y 71,93° O; en pantalla, 39° 25′ S.
4. **Rio de Janeiro.** Las dos problemáticas documentadas en `docs/fuentes-rio.md`, la bahía de Guanabara y las encostas donde se vive y llueve, dan la costa y el morro del plano 6. No se usa ninguna cifra de ese archivo.
5. **Comunas piloto.** `data/araucania/communes/comunas_piloto.geojson` lista Lonquimay, Curarrehue y Melipeuco. Las tres son cordilleranas, lo que respalda usar volcán, araucaria y bosque templado como materia visual.

## Guion plano a plano

Tiempos en segundos. La curva de aceleración de todo el movimiento es la de marca, (0,22, 1, 0,36, 1): salida suave, sin rebote.

### Plano 1 · 0,0 → 3,0 · Curva de nivel

* **Imagen.** Negro azulado. Una sola curva de nivel, color papel crudo, se traza sola entre 0,5 y 2,7: es el contorno más bajo del volcán visto en planta, con las muescas de las quebradas. Queda quieta hasta 3,0.
* **Movimiento protagonista.** El trazo.
* **Texto.** Ninguno. **Naranjo.** Ninguno.

### Plano 2 · 3,0 → 7,0 · Volcán Villarrica

* **Imagen.** Entre 3,0 y 4,6 aparecen las otras quince curvas hacia adentro: el mapa topográfico del volcán. Entre 4,5 y 6,8 el mapa se levanta: cada curva sube a su cota, con equidistancia constante, y la pila forma la silueta del Villarrica. Las curvas altas tapan la parte trasera de las bajas, como en una maqueta de cartón por capas. El negro azulado se abre al azul de marca entre 3,0 y 6,6. Tres capas de neblina entran desde los lados entre 4,9 y 7,0 y cubren la base. Lluvia fina desde 4,8.
* **Movimiento protagonista.** El mapa que se levanta.
* **Texto.** Rótulo con línea guía a la cumbre, de 5,5 a 7,15: «Volcán Villarrica / 39° 25′ S».
* **Naranjo.** Ninguno.

### Plano 3 · 7,0 → 11,0 · Araucaria en contraluz

* **Imagen.** Entre 6,9 y 7,8 el volcán se aleja y queda como silueta lejana con su casquete de nieve; el cielo pasa a azul medio con luz baja cerca del horizonte; al frente, bosque templado en silueta. Entre 7,2 y 8,3 aparece desde la neblina una araucaria adulta en contraluz, dibujada a escala: 28 m de alto y 1,2 m de diámetro.
* **Movimiento protagonista.** Entre 8,0 y 9,15 una cinta de medición baja por el tronco desde la base de la copa y marca cada 2 m. Entre 9,1 y 9,45 dobla a 1,3 m del suelo y cruza el tronco: es el diámetro a la altura del pecho, la medida estándar en dasometría.
* **Texto.** Etiqueta de ejemplar, de 9,3 a 11,35: «*Araucaria araucana* / Ø 1,2 m». Titular, de 9,45 a 11,35: «El lugar es el aula.»
* **Naranjo.** La cinta y el compás.

### Plano 4 · 11,0 → 15,0 · Fichas de campo

* **Imagen.** La retícula del cuaderno aparece entre 11,2 y 11,8. Tres fichas entran como stickers en 11,3, 11,6 y 11,9: bajan, giran y se asientan, y su sombra se acorta al pegarse. Los dibujos se trazan entre 11,9 y 14,1.
  * Registro 01 · Estero · *Aegla* sp. Corte transversal del estero con cota de ancho, sondeos de profundidad, piedras del vado y una pancora.
  * Registro 02 · Picaflor chico · *Sephanoides sephaniodes*. Un macho liba una flor de chilco.
  * Registro 03 · Monito del monte · *Dromiciops gliroides*. Sobre una rama, con la cola prensil enrollada.
* **Movimiento protagonista.** La entrada de las fichas.
* **Naranjo.** La corona del picaflor, que se enciende entre 13,2 y 13,6. Es el rasgo diagnóstico del macho, no un adorno.

### Plano 5 · 15,0 → 19,0 · Proyecto situado

* **Imagen.** Entre 15,0 y 15,7 las fichas se compactan a su dibujo. Entre 15,5 y 16,4 tres líneas finas salen de ellas y convergen en un nodo: el mismo anillo con punto de la «o» del logo. Del nodo sale una línea y entre 16,5 y 17,0 se despliega la ficha del proyecto. No hay cerebros, circuitos ni partículas: la inteligencia artificial se representa como lo que hace, conectar registros y proponer una investigación.
* **Movimiento protagonista.** La convergencia de las líneas.
* **Texto.** Entre 16,75 y 17,4: «Proyecto Nº 07», «Caudal del estero», «5º a 8º básico», «Medir · *Q* = *v* · *A*», «Escuchar · saberes de la comunidad». Las dos fuentes del proyecto, la medición y el saber local, van con el mismo peso tipográfico.
* **Naranjo.** El punto del nodo. La corona del picaflor pasa a ocre para no competir.

### Plano 6 · 19,0 → 22,0 · Otro territorio

* **Imagen.** Entre 19,1 y 19,6 vuelven las curvas del volcán, más chicas y a un lado. Entre 19,7 y 21,5 se reordenan: tres se estiran en líneas de agua, la bahía, y el resto forma un morro de granito, de laderas empinadas y cima redonda. El rótulo pasa de «Volcán Villarrica» a «Rio de Janeiro» y la latitud corre de 39° 25′ S a 22° 54′ S. Sin mapas, sin banderas, sin postal.
* **Movimiento protagonista.** El reordenamiento de las curvas.
* **Texto.** Entre 19,5 y 22,0: «Cada escuela tiene su propio laboratorio afuera.»
* **Naranjo.** Ninguno; se guarda para el cierre.

### Plano 7 · 22,0 → 25,0 · Logo

* **Imagen.** Entre 21,55 y 21,95 las líneas de agua se retiran. Entre 21,75 y 23,0 las curvas del morro caen una tras otra sobre el contorno oficial del monte y del círculo. Entre 22,7 y 23,1 el monte se llena y queda la silueta exacta. «aprende» y «local» aparecen entre 22,95 y 23,55. Entre 23,55 y 24,1 el punto naranjo cae dentro del anillo de la «o», como un pin. Quietud hasta 25,0.
* **Movimiento protagonista.** Las curvas que arman el monte.
* **Naranjo.** El punto.

## Diseño sonoro

Sin música. La pieza suena a lugar: lluvia, viento, agua, papel y lápiz. Un solo tono al cierre.

1. **0,0 → 3,0.** Silencio. Solo el grafito sobre papel mientras se traza la curva (0,5 a 2,7), muy cerca y seco. Alternativa más radical: silencio absoluto hasta 3,0.
2. **3,0 → 7,0.** Entra lluvia fina sobre follaje, lejana; no lluvia sobre techo. Viento bajo desde 4,5; crece apenas cuando el mapa se levanta. Nada de efectos de transición.
3. **7,0 → 11,0.** Viento en el bosque, más cercano; la lluvia baja cuando aparece la araucaria. Ocho clics suaves de cinta métrica entre 8,0 y 9,15, uno por marca, y un clic de cierre en 9,45. Bajo el titular (9,5) el ambiente baja 6 dB.
4. **11,0 → 15,0.** Tres golpes de papel sobre papel en 11,3, 11,6 y 11,9, y lápiz mientras se dibujan las fichas. Bajo cada una, un segundo de su sujeto: agua corriendo en un estero de la zona; alas y llamado del picaflor chico; para el monito del monte, solo hojarasca de noche, porque no conviene inventarle una vocalización.
5. **15,0 → 19,0.** Lápiz para las tres líneas. Nada electrónico al llegar al nodo. Un roce de papel cuando se despliega el proyecto. El ambiente del bosque se retira.
6. **19,0 → 22,0.** La lluvia y el viento del sur se funden en olas lejanas sobre una costa y un viento más tibio. Sin samba ni ritmo que fuerce lo «brasileño».
7. **22,0 → 25,0.** Todo el ambiente se apaga entre 22,0 y 23,3. Silencio. En 24,1, cuando el punto cae, un solo tono: una nota tenida de barra de madera o de piano con fieltro, registro medio, ataque suave, cola que llega a silencio en 25,0.

**Técnica.** Mezcla a 14 LUFS integrados bajo cero y pico real de 1 dBTP bajo cero, que es el estándar de las plataformas de video. Compatible en mono. Los parlantes de teléfonos de gama baja casi no reproducen bajo 200 Hz: los eventos que importan (lápiz, clics, tono final) viven entre 1 y 5 kHz y nada depende de graves.

**Fuentes de audio.** Grabaciones propias en terreno, o de archivos sonoros con licencia verificada pieza por pieza: en los archivos abiertos de aves cada grabación tiene su propia licencia. Las voces de animales deben ser de la especie correcta y de la región.

**Fuera de la propuesta.** Instrumentos mapuche (kultrun, trutruka, pifilka, kaskawilla), cantos o voces en mapuzugun. Muchos tienen uso ceremonial; cualquier uso requiere consulta previa y no se propone aquí.

## Supuestos y decisiones

1. **El logo no es un piñón.** El brief describe un cono de araucaria geométrico. El logo oficial del repositorio es un monte triangular con una araucaria calada y un círculo en la base, y la «o» de «local» es un anillo con punto naranjo. Como el brief exige que la silueta final sea exacta, la pieza usa el archivo oficial. En consecuencia, el plano 7 arma «el monte» desde las curvas, no «el piñón». Si existe un logo nuevo que no está en el repositorio, basta reemplazar las constantes `MONTE` y `PALABRA` en `intro.html`; los destinos de la animación se recalculan solos.
2. **Color del logo.** El componente oficial llama `CREMA` a #E4DED2, que el brief llama «papel crudo». Se usó #E4DED2 porque es el valor del archivo del logo. Cambiarlo a #FFF3E4 es una sola línea (`COLOR_LOGO`).
3. **Peso de «local».** En el logotipo oficial, «local» está en un peso liviano. Choca con la regla de no usar tipos finos, pero es el logo y no se redibujó.
4. **Negro azulado.** No está en la paleta. Se obtiene oscureciendo #172B87 al 30 % (#070D29) y se usa en el plano 1, en el suelo y en la araucaria del plano 3 para que el contraluz funcione. No es un color nuevo de marca.
5. **Tipografía.** Archivo 800 con interletrado de 0,045 em negativo e interlineado 0,88; Newsreader 500, itálica solo para nombres científicos y para magnitudes físicas (*Q*, *v*, *A*). En el plano 3 el titular se cortó «El lugar es el / aula.» porque con el corte «El lugar / es el aula.» y ese interlineado la «g» choca con la «l».
6. **La ficha del estero.** Un estero no tiene nombre científico. Se le asignó la pancora, *Aegla* sp., identificada solo a género: la especie exige examinar ejemplares, y el género es bioindicador de calidad del agua, lo que conecta con el proyecto de caudal. Por convención, «sp.» va en redonda.
7. **El picaflor es macho.** Solo el macho tiene la corona iridiscente rojo anaranjada. Liba un chilco (*Fuchsia magellanica*), una de las plantas que poliniza.
8. **Legibilidad.** Todo el texto final mide 48 px o más en el lienzo de referencia. Contrastes medidos con la fórmula WCAG: titulares crema sobre azul 11,1:1 y sobre azul medio 8,3:1; rótulos papel sobre azul 9,1:1; nota de la araucaria sobre negro azulado 14,3:1; textos de las fichas entre 7,9:1 y 10,6:1. El naranjo nunca lleva texto: sobre azul da 3,0:1, suficiente para una marca gráfica y no para leer. La única excepción de tamaño es el recuadro de foto, que es un marcador de producción apagado por defecto.
9. **Zonas seguras del 9:16.** Ningún texto baja de 1630 px, para que la interfaz de Reels o TikTok no lo tape. Conviene revisarlo con la plantilla de la plataforma de destino.
10. **Rendimiento.** Menos de 4 ms de cálculo por cuadro y 60 cuadros por segundo en Chromium. Se evitaron filtros SVG y desenfoques por su costo en equipos modestos.

## Rigor: lo que conviene verificar antes de publicar

1. **Ø 1,2 m es ilustrativo.** No corresponde a un árbol medido. Es plausible para una araucaria adulta, pero el brief prohíbe resultados inventados y un dato de campo sin fuente puede leerse así. Lo más sólido es reemplazarlo por la medición real de una araucaria cercana a una escuela piloto, y anotar dónde y cuándo se midió.
2. **La taxonomía del monito del monte está en discusión.** D'Elía y colaboradores propusieron en 2016 dividir *Dromiciops* en tres especies; trabajos genéticos posteriores cuestionaron esa división. Se usó *Dromiciops gliroides*, el nombre del brief y del catálogo de la plataforma. Conviene que un especialista lo confirme.
3. **Q = v · A.** Es correcto si *v* es la velocidad media de la sección. Con el método del flotador, que es el que haría un curso de 5º a 8º básico, se mide la velocidad superficial, que es mayor que la media; suele corregirse multiplicando por un coeficiente cercano a 0,85. La ficha del proyecto real debería decirlo.
4. **Coordenadas.** 39° 25′ S es el Villarrica según los datos de la plataforma; 22° 54′ S es el centro de Rio de Janeiro. El morro dibujado es genérico: no representa un morro específico.
5. **Grafemarios.** El catálogo de la plataforma mezcla escrituras: «pewen» sigue un grafemario del mapuzugun y «chumaihuén» una escritura castellanizada. Es un asunto a resolver con las comunidades, no desde el diseño.

## Elementos que requieren consulta previa a la comunidad

Todos están marcados en el código con el comentario «REQUIERE CONSULTA PREVIA A LA COMUNIDAD» y quedan **desactivados por defecto**. Se encienden desde el panel bajo el video o con el parámetro `?consulta=`.

1. **`nombresMapuzugun`.** Muestra los nombres en mapuzugun que ya guarda la plataforma, junto al nombre científico y con el mismo peso: *Araucaria araucana* · pewen, pigda en el picaflor chico, chumaihuén en el monito del monte y «Rukapillán · Villarrica» en el rótulo del volcán. La idea es presentar dos sistemas de conocimiento a la par, no un «toque local»; si eso ocurre o no, y con qué escritura, lo decide la comunidad.
2. **`fotoEstudiantes`.** Un recuadro de producción para una fotografía de estudiantes y su docente midiendo el ancho y la profundidad del estero, con luz nublada y sin posar. Si se toma, las personas son protagonistas haciendo ciencia; requiere además consentimiento informado de las familias y del establecimiento.

La línea «Escuchar · saberes de la comunidad» del proyecto queda activa: no usa iconografía, lengua ni símbolos mapuche, y cumple el pedido de que el conocimiento local aparezca a la par de la ciencia escolar. Aun así, cómo se recogen esos saberes en un proyecto real (quién habla, con qué permiso, qué vuelve a la comunidad) debería acordarse con las comunidades antes de que la plataforma lo proponga en aula.

La pieza no usa kultrun, trarilonko, grecas, ñimin ni textilería, ni nombres en mapuzugun con los interruptores apagados.
