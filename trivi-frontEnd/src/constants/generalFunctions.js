export const TabTitle = (newTitle) => {
    return document.title = `Prototype ${newTitle === '' ? '' : ' - '} ${newTitle}`;
}

export const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
}