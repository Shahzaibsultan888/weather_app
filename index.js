const tempratureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")
let target = "karachi"


const fetchData = async(target)=>{
   try {
    const url = `http://api.weatherapi.com/v1/current.json?key=e45a7d01443a40fa8e8171728231009&q=${target}`
    const responce = await fetch(url)
    const data = await responce.json()
    
    const {
        current:{temp_c,condition:{text,icon}},
        location:{name,localtime},
        


    }=data

    updateDom(temp_c,name,localtime,icon,text)
    
   } catch (error) {
    alert("Location Not Found")
   }
}
function updateDom(temprature,city,time,emoji,text){
    tempratureField.innerText = temprature
    cityField.innerText = city
    let exactDate = time.split(" ")[0]
    let exactTime = time.split(" ")[1]
    let exactDay = getDayName(new Date(exactDate).getDay())

    
   dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`
    emojiField.src = emoji
    weatherField.innerText = text
}
fetchData(target)
function getDayName(num){
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
    
        default:
            break;
    }
}


const search =(e)=>{
e.preventDefault()
target = searchField.value
fetchData(target)
}

form.addEventListener("submit",search)