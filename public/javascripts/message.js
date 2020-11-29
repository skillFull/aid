
let socket =  new WebSocket('ws://localhost:8000/');
document.forms.message.onsubmit = function(){
  try{

   socket.send(this.input_message.value);
    return false
  }
  catch(e){
      console.log(e)
  }
}
