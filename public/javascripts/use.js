const newEvent = document.getElementById('newEvent');



let Position ;
 navigator.geolocation.getCurrentPosition((position) => {
    Position = position.coords
    },
    (positionError) => {
        console.error(positionError)
    }
)




newEvent.onsubmit = async function(e) {
    e.preventDefault();
    if(this.onEvent.value.length && this.descriptionEvent.value.length && Position.latitude && Position.longitude !== null || 0 || NaN || undefined){

        let formData = new FormData(this);
        formData.append('latitude', Position.latitude)
        formData.append('longitude', Position.longitude)
        formData.append('Date', new Date().getTime())
        await fetch('/events', {
            method: 'POST',
            body:  formData,
        }).then(res => console.log('Пришло'))
    }
    else{
        if(this.onEvent.value.length && this.descriptionEvent.value.length === 0 ){
            alert('Опишите событие')
        }
        if (Position.latitude && Position.longitude == null || NaN || undefined) {
            alert("Включите геопозицию")
        }
    }
     
}

