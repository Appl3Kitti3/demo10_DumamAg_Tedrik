function read_display_Quote(){
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
    .onSnapshot(function(tuesdayDoc) {
        //console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    })
}
read_display_Quote();

function insertName(){
// to check if the user is logged in:
 firebase.auth().onAuthStateChanged(user =>{
     if (user){
         console.log(user.uid); // let me to know who is the user that logged in to get the UID
        currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
        currentUser.get().then(userDoc=>{
            //get the user name
            var user_Name= userDoc.data().name;
            console.log(user_Name);
            $("#name-goes-here").text(user_Name); //jquery
            // document.getElementByID("name-goes-here").innetText=user_Name;
        })    
    }

 })
}
insertName();

function populateCardsDynamically() {
    let cardTemplate = document.getElementById("featureCardtemplate");
    let cardGroup = document.getElementById("features-go-here");
    
    db.collection("features").get()
        .then(allFeatures => {
            allFeatures.forEach(doc => {
                // var hikeName = doc.data().name; //gets the name field
                // var hikeID = doc.data().code; //gets the unique ID field
                // let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                
                var title = doc.data().name;        // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                var featureID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${featureID}.png`; //Example: NV01.jpg
                newcard.querySelector('a').onclick = () => setFeatureData(featureID);//equiv getElementByTagName

                // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
                cardGroup.appendChild(newcard);
            })

        })
}
populateCardsDynamically();

function setFeatureData(id){
    localStorage.setItem('featureID', id);
}