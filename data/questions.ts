
import { Question, QuestionWithStatus, AnswerStatus } from '../types';
import { ALPHABET_ES } from '../constants';

const gameQuestionsSet: Question[] = [
    { letter: "A", clue: "Prenda de vestir que cubre el torso y los brazos, se abrocha por delante.", answer: "ABRIGO" },
    { letter: "B", clue: "Embarcación pequeña, sin cubierta, movida a remo o motor.", answer: "BOTE" },
    { letter: "C", clue: "Edificio o parte de él destinado para vivir.", answer: "CASA" },
    { letter: "D", clue: "Que tiene consistencia firme o sólida.", answer: "DURO" },
    { letter: "E", clue: "Mamífero paquidermo de gran tamaño, con trompa y grandes orejas.", answer: "ELEFANTE" },
    { letter: "F", clue: "Reunión de personas para celebrar algo o divertirse.", answer: "FIESTA" },
    { letter: "G", clue: "Mamífero felino doméstico.", answer: "GATO" },
    { letter: "H", clue: "Elemento químico más ligero, incoloro e inodoro.", answer: "HIDROGENO" },
    { letter: "I", clue: "Porción de tierra rodeada de agua por todas partes.", answer: "ISLA" },
    { letter: "J", clue: "Día de la semana que sigue al miércoles.", answer: "JUEVES" },
    { letter: "K", clue: "Unidad de masa equivalente a mil gramos.", answer: "KILOGRAMO" },
    { letter: "L", clue: "Mamífero felino de gran melena, conocido como el rey de la selva.", answer: "LEON" },
    { letter: "M", clue: "Progenitora, mujer que ha tenido hijos.", answer: "MADRE" },
    { letter: "N", clue: "Parte prominente del rostro humano, entre la frente y la boca, con dos orificios para respirar.", answer: "NARIZ" },
    { letter: "Ñ", clue: "Ave corredora americana, parecida al avestruz pero más pequeña.", answer: "ÑANDU" },
    { letter: "O", clue: "Metal precioso de color amarillo brillante, muy dúctil y maleable.", answer: "ORO" },
    { letter: "P", clue: "Mamífero doméstico de la familia de los cánidos, amigo del hombre.", answer: "PERRO" },
    { letter: "Q", clue: "Alimento sólido obtenido por la maduración de la cuajada de la leche.", answer: "QUESO" },
    { letter: "R", clue: "Pequeño mamífero roedor de cola larga.", answer: "RATON" },
    { letter: "S", clue: "Estrella luminosa, centro de nuestro sistema planetario.", answer: "SOL" },
    { letter: "T", clue: "Vehículo ferroviario compuesto por varios vagones arrastrados por una locomotora.", answer: "TREN" },
    { letter: "U", clue: "Fruto pequeño, redondo u ovalado, que crece en racimos.", answer: "UVA" },
    { letter: "V", clue: "Bebida alcohólica obtenida del zumo de uva fermentado.", answer: "VINO" },
    { letter: "W", clue: "Emparedado de pan de molde con relleno, de origen inglés.", answer: "SANDWICH" }, // W is tricky for Spanish "Empieza por". Sandwich is common. Could be WAFFLE.
    { letter: "X", clue: "Instrumento musical de percusión formado por láminas de madera ordenadas por tamaño.", answer: "XILOFONO" },
    { letter: "Y", clue: "Parte central y amarilla del huevo.", answer: "YEMA" },
    { letter: "Z", clue: "Calzado que cubre el pie y, a veces, parte de la pierna.", answer: "ZAPATO" },
];

export const getInitialQuestions = (): QuestionWithStatus[] => {
    return ALPHABET_ES.map(char => {
        const questionData = gameQuestionsSet.find(q => q.letter.toUpperCase() === char.toUpperCase());
        if (!questionData) {
            return {
                letter: char,
                clue: `(Sin definir) Pista para la letra ${char}`,
                answer: `RESPUESTA${char}`,
                status: 'pending' as AnswerStatus,
            };
        }
        return {
            ...questionData,
            answer: questionData.answer.toUpperCase(),
            status: 'pending'as AnswerStatus,
        };
    });
};
