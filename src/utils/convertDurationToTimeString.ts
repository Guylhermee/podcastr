export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        //ao percorrer cada unidade do array, caso tenha um valor único nas unidades (ex: 1 hora) 
        //adicione um 0 na frente (ex: 01 hora), fazendo com q tenha dois dígitos
        .join(':')  //vai unir os valores do array com o ":"

    return timeString;
}
