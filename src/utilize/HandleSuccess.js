import Swal from "sweetalert2"

export const handleSuccess = {
    successSwalData(text = "create"){
        let textPrint  = ''
        if(text === 'create'){
            textPrint = 'Successfull create data'
        } else if(text === 'update'){
            textPrint = 'Successfull edit data'
        } else {
            textPrint = 'Successfull delete data'
        }
        Swal.fire({
          title: "Success",
          text: textPrint,
          icon: "success",
          confirmButtonColor:"#38bdf8",
        })
    },

    successSwalPasswordAndProfile(text='update_password'){
        let textPrint  = ''
        if(text === 'update_password'){
            textPrint = 'Successfull update password'
        }  else {
            textPrint = 'Successfull update profile'
        }

        Swal.fire({
            title: "Success",
            text: textPrint,
            icon: "success",
            confirmButtonColor:"#38bdf8",
        })
    },

    successMessage(text = ''){
        Swal.fire({
            title: "Success",
            text: text,
            icon: "success",
            confirmButtonColor:"#38bdf8",
        })
    }
}