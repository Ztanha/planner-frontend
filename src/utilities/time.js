export class Time {
    static decodeToString(time){
        let t = time.toString();
        if(t.length === 3) t='0'+t
        return t
    }
    static decode(time){
        if(time === -1 )return 0;
        if( time === 0 )return 0;
        let t = time.toString();
        if(t.length === 3) t='0'+t
        return {
            hour : this.normalize(t.slice(0,2)),
            minute : this.normalize(t.slice(2))
        }
    }
    static encode( time ){
        if( time === '')return -1;
        return time.replace(":",'')
    }
    static normalize( time ) {
        time = parseInt(time)
        if(time < 10) {
            return '0'+time;
        }else{
            return time;
        }
    }
    static update( time,part='hour',value ) {

        const timeObj = this.decode( time );
        value = this.normalize( value );
        if( part === "hour" ) {
            return `${ value }${ timeObj.minute }`
        }else{
            return `${ timeObj.hour }${ value }`
        }
    }
    static getInt( time, type='hours' ){

        if(time==0){
            return 0;
        }
        if(typeof time === 'string'){
            time = this.encode(time);
        }
        if(type === 'hours') {
            return Number(String(time).slice(0,2));
        }else if(type === 'minutes') {
            return Number(String(time).slice(2));
        }
    }
    static add(first, second) {
        let hours,mins;
        if(first !=='0' && second !== "0" ){

            const fHours = this.getInt( first,'hours' );
            const fMins = this.getInt( first,'minutes' );
            const sHours = this.getInt( second );
            const sMins = this.getInt( second,'minutes' );

            hours = fHours+sHours;
            mins = fMins+sMins;

            if( mins >= 60 ) {
                mins = mins % 60;
                hours = hours+1;
            }
            mins = this.normalize( mins );
            hours = this.normalize( hours );

        }else if(second === "0")return first;
        else if(first === "0") return second;

        return hours+':'+mins;
    }
    static subtract(first,second) {

        const fHours = this.getInt( first,'hours' );
        const fMins = this.getInt( first,'minutes' );
        const sHours = this.getInt( second );
        const sMins = this.getInt( second,'minutes' );
        let mins,hours;
        if(sMins < fMins) {
            mins = ( sMins + 60 )- fMins;
            hours = sHours - fHours -1;
        }else{
            mins = sMins-fMins;
            hours = sHours - fHours
        }
        // mins = this.normalize( mins );
        // hours = this.normalize( hours );
        return {hours : hours, mins : mins};
    }
}
