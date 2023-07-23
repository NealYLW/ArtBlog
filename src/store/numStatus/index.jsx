export default{
    state:{
        num:0
    },

    actions:{
        add(newState, action){
            newState.num++;
        },
    },

    add:'add'
}