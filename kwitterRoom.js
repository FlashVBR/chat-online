


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
//ADICIONE SEUS LINKS FIREBASE

userName = localStorage.getItem("userName")

document.getElementById("userName").innerHTML = "Boas vindas " + userName + "!";

function addRoom()
{
roomName = document.getElementById("roomName").value 

firebase.database().ref("/").child(roomName).update({
  purpose:"adicionado nova sala"
})
localStorage.setItem("roomName",roomName)
    
window.location = "kwitterPage.html"

}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; //linha que pega todos os dados do firebase e mostra em alguma div html, esse código é pego pela documentação do firebase
       roomNames = childKey; //armazenando todos os nomes de cada sala na variável
       console.log("Nome da Sala - " + roomNames); //só para verificação
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; //this.id significa a id do elemento do html atual, e a id do dessa div é o nome da sala, entao, quando clicar na sala saberemos para qual sala estamos entrando etc.
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData(); //chamando a função getData() assim que carregar a página

function redirectToRoomName(name) //name é uma referencia para o this.id para receber o nome da sala e redirecionar para ela
{
  console.log(name);
  localStorage.setItem("roomName", name); // salvando no localStorage
    window.location = "kwitterPage.html"; //indo para dentro da sala
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
