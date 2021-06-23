import { firebaseAuth } from "../boot/firebase"
import { LocalStorage, Dialog } from 'quasar'
import { showMessage } from 'src/functions/function-show-toast'

const state = {
    isUserLoggedIn: false,
    labelLogoutButton: ""
}

const mutations = {
    setLoggedIn(state, value) {
        state.isUserLoggedIn = value
    },
    setLabelLogoutButton(state, value) {
        //console.log('set label with email', value);
        state.labelLogoutButton = value
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
                showMessage(error.message)
            })             
    },
    loginUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                // user is logged in
            })
            .catch(error => {
                //add catch call back for when there is an error
                showMessage(error.message)
            })          
    },
    handleUserStateChange({ commit, dispatch }) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                //console.log('user is logged In =>', user.email);
                commit('setLabelLogoutButton', user.email)
                commit('setLoggedIn', true)
                LocalStorage.set('isUserLoggedIn', true)
                this.$router.push('/').catch(err => {})
                dispatch('foods/fbReadFoods', null, { root: true })
            }
            else {
                //console.log('user is logout');
                commit('foods/clearFoodsObject', null, { root: true })
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