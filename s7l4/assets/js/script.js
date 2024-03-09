const query = 'https://api.pexels.com/v1/search?query=';
const cardsImage = document.querySelectorAll('.card img');
const hideBtn = document.querySelectorAll('.card .card-body button')

async function loadImages(search) {
	let searchQuery = '';
	switch (search) {
		case 1:
			searchQuery = 'naruto';
			break;
		case 2:
			searchQuery = 'javascript';
			break;
		default:
			searchQuery = search;
			break;
	}
	try {
		const request = await fetch(query + searchQuery, {
			headers: {
                Authorization:
				    'Qw1xKr5X3M4oby9iQ0zkjTBQtGcZ3KfEM0TLYbTrga5eiNNmPCNYi5HD'
            }
		});
		const response = await request.json();
        for (let i=0; i < cardsImage.length; i++) {
            cardsImage[i].src = response.photos[i].src.original
        }
        for (let i=0;)
	} catch (error) {
        console.log(error)
    }
}