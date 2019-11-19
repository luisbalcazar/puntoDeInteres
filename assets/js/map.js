let coordinates = []
let userCoord = []
let save = $('#save')
let buttonFloat = $('#buttonFloat')
let counter = 0
let markers = []
let description = document.getElementById('description')
let phone = document.getElementById('phone')
let category = document.getElementById('category')
let address
let tagSpan
let coord //Ambos input estan conectados
let coord1
let locationNoFound

$(document).ready( () => {

	$('#formModal').modal('show') // La ventana modal se mostrará al cargar el DOM
	coord = $("#coord")
	coord1 = $("#coord1")

	coord1.attr('type', 'number')

	coord.on('change', function() {

		tagSpan = $(".bootstrap-tagsinput > span")

		//En caso de que ya la latitud y longitud esten ingresadas
		if (tagSpan.length == 2) {

			coord1.removeAttr('required')
			coord.removeAttr('required')

			coord1.prop('readonly', 'readonly')
			coord.prop('readonly', 'readonly')

			let lat = tagSpan[0].textContent
			let lng = tagSpan[1].textContent

			if (lat.indexOf('.') != -1 && lng.indexOf('.') != -1) {

				let latitude = lat.split('.')
				let longitud = lng.split('.')

				//Validamos la latitud
				if (lat.indexOf('-') == 0 ) {

					if (latitude[0] < -90) {

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser menor a -90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						coordinates.push(tagSpan[0].textContent)
					}

				} else if (lat.indexOf('-') == -1 ) {

					if (latitude[0] > 90) {

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser mayor a 90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						coordinates.push(tagSpan[0].textContent)
					}
				}

				// Validamos la longitud
				if (lng.indexOf('-') == 0 ) {

					if (longitud[0] < -180) {

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser menor a -180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						coordinates.push(tagSpan[1].textContent)
					}

				} else if (lng.indexOf('-') == -1 ) {

					if (longitud[0] > 180) {

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser mayor a 180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})
						
					} else {
						coordinates.push(tagSpan[1].textContent)
					}
				}			

			} else {

				Swal.fire({
					  icon: 'error',
					  title: 'Oops...',
					  text: 'La latitud o longitud ingresada no es correcta'
					}).then((result) => {
						  if (result.value) {
						    tagSpan[0].remove()
						    tagSpan[1].remove()

						    coord1.removeAttr('readonly')
							coord.removeAttr('readonly')

							coord1.prop('required', 'empty')
							coord.prop('required', 'empty')
						  }
						})

			}

		} else {

			coord1.removeAttr('readonly')
			coord.removeAttr('readonly')

			coord1.prop('required', 'empty')
			coord.prop('required', 'empty')
		}
		
	})
})

// Funcion para buscar coordenadas a través de dirección ingresada
const searchCoords = () => {

	let geocoder = new L.Control.Geocoder.Nominatim()
	let tagContainer = $(".bootstrap-tagsinput")
	coord = $("#coord")
	coord1 = $("#coord1") //Ambos input estan conectados
	tagSpan = $(".bootstrap-tagsinput > span")
	address = document.getElementById('address')
	
	geocoder.geocode(address.value, (results) => {    

		if (results <= 0 && address.value != '') {

			Swal.fire({
					  icon: 'error',
					  title: 'Oops...',
					  text: '¡La direccion no ha sido encontrada. Por favor, especifique las coordenadas o reingrese la dirección!'
					})

			if (tagSpan.length > 0) {

				tagSpan[0].remove()
				tagSpan[1].remove()

				coord1.removeAttr('readonly')
				coord.removeAttr('readonly')

				coord1.prop('required', 'empty')
				coord.prop('required', 'empty')
			}

		} else if(address.value == '') {

			if (tagSpan.length > 0) {

				tagSpan[0].remove()
				tagSpan[1].remove()

				coord1.removeAttr('readonly')
				coord.removeAttr('readonly')

				coord1.prop('required', 'empty')
				coord.prop('required', 'empty')
			}

		} else if (results && results != 0 && address.value != '' && results != undefined) {

			let verify

			if (tagSpan.length > 0) {

				tagSpan[0].remove()
				tagSpan[1].remove()

				coord1.removeAttr('readonly')
				coord.removeAttr('readonly')

				coord1.prop('required', 'empty')
				coord.prop('required', 'empty')

				let centerLat = ''+results[0].center.lat
				let centerLng = ''+results[0].center.lng

				let latDivided = centerLat.split('.')
				let lngDivided = centerLng.split('.')

				//Validamos la latitud
				if (centerLat.indexOf('-') == 0 ) {

					if (latDivided[0] < -90) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser menor a -90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// Agrega latitud
						verify = true
					}

				} else if (centerLat.indexOf('-') == -1 ) {

					if (latDivided[0] > 90) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser mayor a 90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// agrega latitud
						verify = true
					}
				}

				// Validamos la longitud
				if (centerLng.indexOf('-') == 0 ) {

					if (lngDivided[0] < -180) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser menor a -180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// agrega longitud
						verify = true
					}

				} else if (centerLng.indexOf('-') == -1 ) {

					if (lngDivided[0] > 180) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser mayor a 180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})
						
					} else {
						// agrega longitud
						verify = true
					}
				}

				if (verify) {

					let spanTag = `<span class="tag label label-info">${centerLat}<span data-role="remove"></span></span>`

					let spanTag2 = `<span class="tag label label-info">${centerLng}<span data-role="remove"></span></span>`

					coordinates.push(results[0].center.lat, results[0].center.lng)

					tagContainer.prepend(spanTag2)
					tagContainer.prepend(spanTag)

					coord1.removeAttr('required')
					coord.removeAttr('required')

					coord1.prop('readonly', 'readonly')
					coord.prop('readonly', 'readonly')

					Swal.fire({
							  type: 'success',
							  title: '¡Se ha encontrado la dirección',
							  text: `
								${results[0].name}
							  `,
							  footer: 'Si esta no es la dirección solicitada, por favor, reingrese la dirección o especifique las coordenadas'
							})
				}

			} else {

				let centerLat = ''+results[0].center.lat
				let centerLng = ''+results[0].center.lng

				let latDivided = centerLat.split('.')
				let lngDivided = centerLng.split('.')

				//Validamos la latitud
				if (centerLat.indexOf('-') == 0 ) {

					if (latDivided[0] < -90) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser menor a -90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// Agrega latitud
						verify = true
					}

				} else if (centerLat.indexOf('-') == -1 ) {

					if (latDivided[0] > 90) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La latitud ingresada no puede ser mayor a 90!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// agrega latitud
						verify = true
					}
				}

				// Validamos la longitud
				if (centerLng.indexOf('-') == 0 ) {

					if (lngDivided[0] < -180) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser menor a -180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})

					} else {
						// agrega longitud
						verify = true
					}

				} else if (centerLng.indexOf('-') == -1 ) {

					if (lngDivided[0] > 180) {
						verify = false

						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text: '¡La longitud ingresada no puede ser mayor a 180!'
						}).then((result) => {
							  if (result.value) {
							    tagSpan[0].remove()
							    tagSpan[1].remove()

							    coord1.removeAttr('readonly')
								coord.removeAttr('readonly')

								coord1.prop('required', 'empty')
								coord.prop('required', 'empty')
							  }
							})
						
					} else {
						// agrega longitud
						verify = true
					}
				}

				if (verify) { 

					let spanTag = `<span class="tag label label-info">${centerLat}<span data-role="remove"></span></span>`

					let spanTag2 = `<span class="tag label label-info">${centerLng}<span data-role="remove"></span></span>`

					coordinates.push(results[0].center.lat, results[0].center.lng)

					tagContainer.prepend(spanTag2)
					tagContainer.prepend(spanTag)

					coord1.removeAttr('required')
					coord.removeAttr('required')

					coord1.prop('readonly', 'readonly')
					coord.prop('readonly', 'readonly')

					Swal.fire({
							  type: 'success',
							  title: '¡Se ha encontrado la dirección',
							  text: `
								${results[0].name}
							  `,
							  footer: 'Si esta no es la dirección solicitada, por favor, reingrese la dirección o especifique las coordenadas'
							})

				}

			}

		}

	})
}

// Creamos una clase para el mapa
class CreateMap {

	constructor() {

		this.url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		this.attributions = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			
		this.markerUser = L.ExtraMarkers.icon({
			icon: 'fas fa-user',
			markerColor: 'blue',
			shape: 'square',
			prefix: 'fa'
		})

		this.markerLocation = L.ExtraMarkers.icon({
			icon: 'fa-circle',
			markerColor: 'red',
			shape: 'circle',
			prefix: 'fa'
		})

		this.osm = L.tileLayer(this.url, {zoom: 18, attribution: this.attributions})

		this.map = L.map('map')
		this.map.locate()

		// Si se puede, capturamos la localización actual del usuario
		
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(location => {

				this.located = {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}
						
				userCoord.push(this.located.lat)
				userCoord.push(this.located.lng)

				this.map.setView([this.located.lat, this.located.lng], 12).addLayer(this.osm)				

				L.marker([this.located.lat, this.located.lng])
					.addTo(this.map)
					.bindPopup('Tu ubicación')
					.setIcon(this.markerUser)
					.openPopup();

				})
		} 

		this.map.on('locationerror', () => {
			
			locationNoFound = false
			alertify.error("Error en localizacion de usuario", 3)
		})

	}
	// Metodo para dibujar marcador
	draw(form){

		if (!locationNoFound) {
			this.map.setView([form.lat, form.lng], 12).addLayer(this.osm)
			locationNoFound = ''
		}

		let marker = L.marker([form.lat, form.lng])
		marker.addTo(this.map)
		.bindPopup(`
			<p>
				<strong>Descripción: </strong>${form.description}<br/>
				<strong>Dirección: </strong>${form.address}<br/>
				<strong>Teléfono: </strong>${form.phone}<br/>
				<strong>Latitud: </strong>${form.lat}<br/>
				<strong>Longitud: </strong>${form.lng}<br/>
				<strong>Categoría: </strong>${form.category}
			</p>
			<a class="trash" id="marker-${form.counter}">
				<i style="color: red" class="fas fa-trash-alt"></i>
			</a>`)
		.setIcon(this.markerLocation)
		.openPopup()

		markers.push(marker)

	}
	// Metodo para borrar marcador
	removeDraw(markerIndex) {
		this.map.removeLayer(markerIndex)
		return 'ok'
	}

}

//Instanciamos el mapa
const mapa = new CreateMap()

// Buscamos la direccion ingresada por el usuario 
address = $('#address')
address.on('focusout', searchCoords)

save.on('click', () => {
	
	//Tomamos la información suministrada en el formulario
	address = document.getElementById('address')
	tagSpan = $(".bootstrap-tagsinput > span")
	
	if (description.value != '' && address.value != '' && phone.value != '' && category.value != '' && tagSpan.length == 2) {

		var form = {
			description: description.value,
			address: address.value,
			phone: phone.value,
			lat: coordinates[0],
			lng: coordinates[1],
			category: category.value,
			counter: counter
		}
		counter++

		//Dibujamos el marcador en el mapa pasando el formulario como parametro
		
		mapa.draw(form)
		coordinates = []
		save.attr('data-dismiss', 'modal')
	
	} else {

		Swal.fire({
					 icon: 'error',
					 title: 'Oops...',
					 text: '¡Por favor, llene todos los campos!'
				})

	}

})

// Dejamos los campos vacios para agregar un nuevo marcador
buttonFloat.on('click', () => {

	tagSpan = $(".bootstrap-tagsinput > span")
	address = document.getElementById('address')
	coord = $("#coord")
	coord1 = $("#coord1") //Ambos input estan conectados 

	if (tagSpan.length > 0) {

		tagSpan[0].remove()
		tagSpan[1].remove()

		coord1.removeAttr('readonly')
		coord.removeAttr('readonly')

		coord1.prop('required', 'empty')
		coord.prop('required', 'empty')
	}

	description.value = ''
	address.value = ''
	phone.value = ''
	category.value = ''
	save.removeAttr('data-dismiss')

})

// Seleccionamos el marcador que queremos borrar

$('#map').on('click', 'a', (e) => {
	
	let trash = `${e.currentTarget.id}`
	let trashArray = trash.split('-')
	let trashId = trashArray[1]

	Swal.fire({
	  title: '¿Esta seguro?',
	  text: "Se borrará este marcador",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, borralo!'
	}).then((result) => {
		if (result.value) {
			if (mapa.removeDraw(markers[trashId])=='ok') {
			   	Swal.fire(
			     '¡Borrado!',
			     'Este marcador ha sido eliminado.',
			     'success'
			   	)
			}
		}
	})

})


