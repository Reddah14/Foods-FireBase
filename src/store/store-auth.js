import { firebaseAuth } from "../boot/firebase"

const state = {

}

const mutations = {

}

const actions = {
    registerUser({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        //console.log('payload: ', payload);
    }
}

const getters = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}