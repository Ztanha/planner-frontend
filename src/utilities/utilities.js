import {Time} from "./time.js";

const days = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const weekday= ["Sun","Mon","Tue","Wed","Thu","Fri","Sau"];

export default function hardCopy(arr){

    return JSON.parse(JSON.stringify(arr))
}
export function codeWeekdays(days){

    let temp='0000000';

    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement +
            this.substring(index + replacement.length);
    }

    for(let i=0; i < days.length ;i++){
        temp= temp.replaceAt(days[i],'1');
    }
    return temp;
}
export function decodeWeekdays(weekdays){


    let temp=[];
    weekdays.split('').forEach((x,index)=>{
        if(x==='1'){
            temp.push(days[index]);
        }
    })
    return temp.join(',');

}
export function normalizeDate(number){

    if(number < 10) {
        return '0'+number;
    }else{
        return number;
    }
}
export function capitalizeFirstChar(string){

    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function timestampToDay(timestamp) {

    const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const temp = new Date(timestamp);
    return `${temp.getFullYear()} ${ months[temp.getMonth()].slice(0,3) } ${temp.getDate()}`
}
export function timeDurationToText(sValue, eValue){
    let text;
    sValue  = ( typeof sValue === 'string') ? sValue : sValue.toString();
    eValue = ( typeof eValue === 'string') ? eValue : eValue.toString();
    if( sValue.length === 4 && eValue.length === 4) {
        text =`From ${ sValue.slice(0,2) }:${ sValue.slice(2) } to ${ eValue.slice(0,2) }:${ eValue.slice(2) }`
    }else if( sValue.length === 4 ) {
        text = `At ${ sValue.slice(0,2) }:${ sValue.slice(2) }`
    }

    return text
}