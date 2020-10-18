export default function convertHourToMinutes(time : string){

    //separa horas de minutos e transforma em numero
    const [hour, minutes] = time.split(':').map(Number);

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}