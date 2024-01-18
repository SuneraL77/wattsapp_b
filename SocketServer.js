export default function(socket){
//user joins or opens the applications
socket.on("join",(user_id) =>{
    console.log("user has joinded:",user_id)
    socket.join(user_id)
});

socket.on("Join conversation",(conversation) =>{
    socket.join(conversation)
    console.log("user has joined conversation           fcdcdcsd f ",conversation)
})
}