<template>
    <Teleport 
        id="ModalEvent" 
        class="z-40"
        to="body"
        v-if="openModal"
    >
        <div
            id="modal-bg" 
            class="w-full h-full z-20 fixed top-0 right-0 blur-background"
            @click="closeModal"
        >
        </div>
        <div 
            class="z-30 w-[24rem] h-full bg-white fixed top-0 right-0"
        >
            <div 
                v-show="!addEvent"
                class="flex px-3 py-4 items-center"
            >
                <div class="w-5/12">
                    <button
                        class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer" 
                        @click="onAddEvent">
                        Add Event
                    </button>
                </div>
                <div class="w-7/12 flex flex-col">
                    <div class="font-semibold">
                        All events on
                    </div>
                    <div >
                        Sunday, August 4, 2024
                    </div>
                </div>
            </div>
            <!-- ********** form add event -->
            <div 
                v-show="addEvent"
                class="flex flex-col px-3 py-4 items-center"
            >
                <div class="w-full flex justify-between ">
                    <div class="text-2xl font-semibold">
                        Add Event
                    </div>
                    <div>
                        <span 
                            class="material-symbols-outlined cursor-pointer"
                            @click="closeAddEvent()"
                        >
                            close
                        </span>
                    </div>
                </div>
                <div class="form w-full mt-5">
                        <div class="flex flex-col mt-2">
                            <div>
                                Event Name * 
                            </div>
                            <div>
                                <input
                                    v-model="nameEvent"
                                    type="text"
                                    required
                                    class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                                    placeholder="Event name"
                                />
                                <small v-if="isNameEventError" class="form-text invalid-feedback">Pleasse fill this field</small>
                            </div>
                        </div>
                        <div class="flex flex-col mt-2">
                            <div>
                                Event Time *
                            </div>
                            <div>
                                    <div class="relative">
                                        <input type="time" id="time" class="border ring-1 ring-inset ring-gray-300  leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            min="09:00" 
                                            max="18:00" 
                                            v-model="timeEvent"
                                            required 
                                        />
                                    </div>                          
                                <small v-if="isTimeEventError" class="form-text invalid-feedback">Pleasse fill this field</small>
                            </div>
                        </div>
                        <div class="flex flex-col mt-2">
                            <div>
                                Invite People * 
                            </div>
                            <div class="flex flex-col">
                                <template
                                    v-for="(item, index) in invitePeople" 
                                    :key="index"
                                >  
                                    <div class="flex mt-1.5">
                                        <div class="w-full flex flex-col items-center mt-1.5">
                                            <input
                                                @change="inviteNameHandle($event, index)"
                                                :value="item.name"
                                                type="text"
                                                required
                                                class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                                                placeholder="Event name"
                                            />
                                            <small v-if="isInvitePeopleError[index]?.status" class="form-text invalid-feedback">Pleasse fill this field</small>
                                            <!-- <small v-if="isTimeEventError" class="form-text invalid-feedback">Pleasse fill this field</small> -->
                                        </div>
                                        <div class="w-[4rem] flex justify-center items-center">
                                            <span 
                                                class="material-symbols-outlined cursor-pointer text-red-600"
                                                @click="deletePeople($event, index)"
                                            >
                                                delete
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div 
                                class="flex mt-1 text-gray-400 cursor-pointer"
                                @click="addInvitePeople()"
                            >
                                <span 
                                    class="material-symbols-outlined pr-2"
                                >
                                    add
                                </span>
                                <span>
                                    Add more people
                                </span>
                            </div>
                        </div>
                        <div class="mt-8 flex justify-between">
                            <button
                                class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer" 
                                @click="submitEvent">
                                Submit
                            </button>

                            <button
                                class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-red-400 hover:bg-red-600 text-sm text-white cursor-pointer" 
                                @click="clearEvent">
                                Cancel
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount, watchEffect } from 'vue';
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import { HandleError } from '@/utilize/HandleError';

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    }
})

const dateValue = ref([]);

const emit = defineEmits([
    'closeModal',
]);

const addEvent = ref(false); 

//******** */ form
const nameEvent = ref('');
const timeEvent = ref('00:00');
const invitePeople = ref([
    {
        name: ''
    }
]);

const isNameEventError = ref(false);
const isTimeEventError = ref(false);
const isInvitePeopleError = ref([
    {
        status: false
    }
]);


const closeModal = () => {
    if(props?.openModal){
        emit('closeModal', false)
        addEvent.value = false
        clearEvent()
    }
};

const onAddEvent = () => {
    addEvent.value = true
}

const closeAddEvent = () => {
    addEvent.value = false
    clearEvent()
}

// ********** handle form dynamic event
const addInvitePeople = () =>{
    const payload = {
        name: ''
    }
    invitePeople.value.push(payload)
}

const inviteNameHandle = ($event, index) =>{
    let oldInvitePeople = [...invitePeople.value]

    oldInvitePeople[index] = {
        ...oldInvitePeople[index],
        name: $event.target.value
    }
    invitePeople.value = oldInvitePeople
}

const deletePeople = ($event, index) => {
    const dataInvitePeople = invitePeople.value
    const dataIsInvitePeopleError = isInvitePeopleError.value
    Swal.fire({
        icon: "warning",
        text: `Are you sure want delete this data ${dataInvitePeople[index].name}?`,
        title: "Delete Data",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result)=>{
        if (result.isConfirmed) {
            invitePeople.value = dataInvitePeople.filter((item, idx) => idx !== index)
            isInvitePeopleError.value = dataIsInvitePeopleError.filter((item, idx) => idx !== index)
        }
    })
}   

const checkValidty = () =>{
    isInvitePeopleError.value = []

    const checkNameEvent = nameEvent.value ?  false: true;
    const checkTimeEvent = timeEvent.value ?  false: true;

    invitePeople.value.forEach((data, index)=>{
        let payload
        if(!data?.name?.length){
            payload = {
                'status': true
            }
        } else {
            payload = {
                'status': false
            }
        }
        isInvitePeopleError.value.push(payload)
    })
    const checkInvitePeople = invitePeople.value.some((data, index)=> data?.name?.length)

    isNameEventError.value = checkNameEvent;
    isTimeEventError.value = checkTimeEvent;
    

    return (
        checkNameEvent
        || checkTimeEvent
        || checkInvitePeople
    )
}
// ********** end handle form dynamic event
const submitEvent = () => {
    if(!checkValidty()){
        const payload = {
            'event-name': nameEvent.value,
            'event-time': timeEvent.value,
            'invite-people': invitePeople.value
        }
        localStorage.setItem('formData', JSON.stringify(payload))
        clearEvent()
    } else  {
        handleError.errorMessage('Please fill all input required')
    }
}

const clearEvent = () =>{
    isNameEventError.value = false
    isTimeEventError.value = false
    isInvitePeopleError.value = [
        {
            status: false
        }
    ]
    nameEvent.value = ''
    timeEvent.valu =  ''
    invitePeople.value = [
        {
            name: ''
        }
    ]
}

</script>

<style scoped>
    .page-not-found{
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        display: flex;
    }
</style>