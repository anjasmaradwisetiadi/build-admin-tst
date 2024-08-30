import dayjs from "dayjs";

export const utilize = {

    truncateWord(word, endString) {
        if(word.length >= endString){
            return word.substring(0, endString)+'...';
        }
        return word
    },

    phoneNumberFormat(data){
        const phonePattern = /[0-9]/;
        return phonePattern.test(data)
    },

    convertTimeDate(date){
        if(dayjs(date)){
            return dayjs(date).format('DD MMMM YYYY');
        }
        return '';
    },

    convertTimeHours(data){
        if(dayjs(data).isValid()){
            return dayjs(date).format('HH:mm');
        }
        return '--:--';
    },

}