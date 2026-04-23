// VALIDERA NAMN
// För att inte skicka tomma namn eller konstiga tecken till high score lista.
// Tillåter a-z, 0-9 och _, omfattning 2-16 tecken,

const isNameValid = (name) => {
        const pattern = /^\w{2,16}$/;
    return pattern.test(name);
};