import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const utilize = {
    handleEmptyString(text){
        if(!text?.length){
            return '-'
        }
        return text
    },

    formatRupiah(value){
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // Tidak menampilkan desimal
            maximumFractionDigits: 0
          }).format(value);
    },

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
            return dayjs(date).format("YYYY-MM-DD");
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