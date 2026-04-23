// VALIDERA NAMN
// För att inte skicka tomma namn till high score lista.
// Tillåter a-z och 0-9, omfattning 2-16 tecken,

const isNameValid = (name) => {
    const pattern = /^[a-zA-Z0-9]{2,16}$/;
    return pattern.test(name);
};