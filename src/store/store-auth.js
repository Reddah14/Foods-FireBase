import { firebaseAuth } from "../boot/firebase"

const state = {
    isUserLoggedIn: false
}

const mutations = {
    setLoggedIn(state, value) {
        state.isUserLoggedIn = value
    }
}

const actions = {
    logoutUser() {
        firebaseAuth.signOut()
    },    
    registerUser({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                //we fire a callback(response) for when successful
                console.log('response: ', response);
            })
            .catch(error => {
                //add catch call back for when there is an error
                console.log(error.message)
            })             
    },
    loginUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                //we fire a callback(response) for when successful
                console.log('response: ', response);
            })
            .catch(error => {
                //add catch call back for when there is an error
                console.log(error.message)
            })          
    },
    handleUserStateChange({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                console.log('user is logged In');
                commit('setLoggedIn', true)
            }
            else {
                console.log('user is logout');
                commit('setLoggedIn', false)
            }
        })
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