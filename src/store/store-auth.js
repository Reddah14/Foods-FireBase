import { firebaseAuth } from "../boot/firebase"
import { LocalStorage } from 'quasar'

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
                //console.log('response: ', response);
            })
            .catch(error => {
                //add catch call back for when there is an error
                console.log(error.message)
            })             
    },
    loginUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                // user is logged in
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
                LocalStorage.set('isUserLoggedIn', true)
                this.$router.push('/').catch(err => {})
            }
            else {
                console.log('user is logout');
                commit('setLoggedIn', false)
                LocalStorage.set('isUserLoggedIn', false)
                this.$router.replace('/auth').catch(err => {}) // use replace() to get rid of user's history, once loggedOut can't go back.
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