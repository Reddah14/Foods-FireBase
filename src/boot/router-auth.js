export default ({ router }) => { // we pass router to manipulate it

  
  router.beforeEach((to, from, next) => { // add hoook beforeEach( fires before each navigation that user tries to do)
        next() // needed for app to start working again
    })

}
