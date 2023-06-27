//LINKS FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyDHhGx3q0ZC7jID6uR9xeMPcwtb5gYoIYI",
  authDomain: "chat-99712.firebaseapp.com",
  databaseURL: "https://chat-99712-default-rtdb.firebaseio.com",
  projectId: "chat-99712",
  storageBucket: "chat-99712.appspot.com",
  messagingSenderId: "1074117829099",
  appId: "1:1074117829099:web:ccd8f5bb13ff972c14f9ae"
};

firebase.initializeApp(firebaseConfig);

 userName = localStorage.getItem("userName")
 roomName = localStorage.getItem("roomName")

function send() //função enviar
{
  msg = document.getElementById("msg").value 
  firebase.database().ref(roomName).push({
    nome : userName,
    message : msg,
    like : 0
  })
  msg =""
}


function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey; //chave única para cada mensagem contendo o nome, mensagem e like
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        nome = messageData['nome'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> " + nome + "<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;
        //Fim do código
      }
    });
  });
}
getData();

function updateLike(messageId) {
  console.log("botão de like pressionado - " + messageId);
  buttonId = messageId;
  likes = document.getElementById(buttonId).value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(roomName).child(messageId).update({
    like: updatedLikes
  });
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location.replace("index.html");
}
