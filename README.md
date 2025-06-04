# Pasapalabra React Game

Este es un juego de Pasapalabra (también conocido como "El Rosco") implementado con React, TypeScript y Tailwind CSS. La aplicación es responsiva y cuenta con selección de tema (claro, oscuro, sistema).

## Características

- Interfaz de Rosco interactiva.
- Temporizador de juego.
- Contador de aciertos y fallos.
- Pistas para cada letra.
- Botones para "Responder" y "Pasapalabra".
- Botón de reinicio que lleva a la pantalla de inicio.
- Diseño responsivo para diferentes tamaños de pantalla.
- Selector de tema: Claro, Oscuro, Según el sistema.
- Pantalla de inicio con instrucciones.

## Cómo ejecutar el proyecto

1.  Asegúrate de tener un servidor web simple o una extensión de navegador que pueda servir archivos estáticos (por ejemplo, "Live Server" para VS Code).
2.  Clona o descarga este repositorio.
3.  Abre el archivo `index.html` en tu navegador a través del servidor web.

## Estructura del Proyecto

-   `index.html`: Punto de entrada HTML, carga Tailwind CSS y el script principal.
-   `index.tsx`: Punto de entrada de la aplicación React.
-   `App.tsx`: Componente principal de la aplicación, maneja el estado del juego y el tema.
-   `constants.ts`: Constantes globales (tiempo inicial, alfabeto).
-   `types.ts`: Definiciones de tipos de TypeScript.
-   `data/questions.ts`: Módulo que contiene el conjunto de preguntas del juego. **Este es el archivo que modificarás para actualizar las preguntas.**
-   `components/`: Carpeta con los componentes de React:
    -   `StartScreen.tsx`: Pantalla de inicio.
    -   `GameScreen.tsx`: Pantalla principal del juego.
    -   `Rosco.tsx`: Componente del círculo de letras.
    -   `InfoCard.tsx`: Tarjeta con información del juego (tiempo, pistas, controles).
    -   `ThemeSwitcher.tsx`: Componente para cambiar el tema.
    -   `Icon.tsx`: Componente para iconos SVG.
-   `metadata.json`: Metadatos de la aplicación.

## Generar Nuevas Preguntas

Puedes usar un modelo de lenguaje grande (LLM) como Gemini para generar nuevas preguntas para el juego. Aquí tienes un prompt que puedes utilizar:

```plaintext
Por favor, genera un nuevo conjunto de 27 preguntas para el juego Pasapalabra en español.
Cada pregunta debe corresponder a una letra del alfabeto español (A, B, C, D, E, F, G, H, I, J, K, L, M, N, Ñ, O, P, Q, R, S, T, U, V, W, X, Y, Z).

Para cada letra, proporciona un objeto con la siguiente estructura:
{
  letter: "LETRA_EN_MAYUSCULA",
  clue: "EMPIEZA POR LA [LETRA]: [Pista para la palabra en español que NO incluya la palabra respuesta. La pista debe ser concisa e informativa.]",
  answer: "PALABRA_RESPUESTA_EN_MAYUSCULA"
}

Asegúrate de que:
1. La `letter` sea la letra correspondiente en mayúscula.
2. La `clue` comience con "EMPIEZA POR LA [LETRA]: " seguido de la pista. Para la letra A sería "EMPIEZA POR LA A: ..."
3. La `answer` sea la palabra correcta en español, en mayúsculas, que comience con la `letter` indicada.
4. Las pistas sean claras y las respuestas sean palabras comunes o razonablemente conocidas en español.
5. Para letras como W o X, encuentra palabras adecuadas, incluso si son extranjerismos comunes.

Ejemplo para la letra A:
{
  letter: "A",
  clue: "EMPIEZA POR LA A: Insecto social conocido por construir hormigueros y trabajar en colonias.",
  answer: "HORMIGA"
}
```

*(Nota: El ejemplo anterior para la letra 'A' es para ilustrar el formato. La respuesta "HORMIGA" comienza con "H", no con "A". Asegúrate de que las respuestas generadas coincidan con la letra.)*

**Un ejemplo correcto sería:**
```javascript
{
  letter: "A",
  clue: "EMPIEZA POR LA A: Anillo que se lleva en el dedo como adorno o símbolo de compromiso.",
  answer: "ANILLO"
}
```

## Actualizar las Preguntas en el Juego

Una vez que tengas el nuevo conjunto de preguntas generado por el LLM (o creadas manualmente):

1.  **Abre el archivo `data/questions.ts`** en tu editor de código.
2.  Dentro de este archivo, encontrarás una constante llamada `gameQuestionsSet`. Esta es un array de objetos, donde cada objeto representa una pregunta.
    ```javascript
    const gameQuestionsSet: Question[] = [
        // ... aquí están las preguntas actuales ...
    ];
    ```
3.  **Reemplaza** el contenido actual del array `gameQuestionsSet` con el nuevo conjunto de preguntas que has generado. Asegúrate de que el formato de cada objeto de pregunta coincida con la interfaz `Question` definida en `types.ts` (y con el formato solicitado en el prompt):
    ```typescript
    interface Question {
      letter: string; // Ejemplo: "A"
      clue: string;   // Ejemplo: "EMPIEZA POR LA A: Ave rapaz nocturna."
      answer: string; // Ejemplo: "AGUILA" (debe estar en mayúsculas)
    }
    ```
4.  **Verifica** que cada `answer` esté en MAYÚSCULAS. El juego compara las respuestas en mayúsculas.
5.  **Guarda el archivo `data/questions.ts`**.
6.  Asegúrate de que el array `ALPHABET_ES` en `constants.ts` (`export const ALPHABET_ES: string[] = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");`) contenga todas las letras para las que has proporcionado preguntas. La función `getInitialQuestions` en `data/questions.ts` intentará encontrar una pregunta para cada letra definida en `ALPHABET_ES`. Si no se encuentra una pregunta para una letra específica en `gameQuestionsSet`, se utilizará una pregunta de marcador de posición.

Después de guardar los cambios, actualiza la página del juego en tu navegador, y deberías ver las nuevas preguntas.

## Tecnologías Utilizadas

-   **React 19** (usando ESM imports vía importmap)
-   **TypeScript**
-   **Tailwind CSS** (CDN)
-   **HTML5**
-   **CSS3**

## Contribuir

Si deseas contribuir, por favor haz un fork del repositorio y envía un pull request.
```