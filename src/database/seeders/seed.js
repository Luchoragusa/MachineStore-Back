const bcrypt = require('bcryptjs'); 

const roles = [
    { id: 1, name: 'Admin'} ,
    { id: 2, name: 'User'} ,
];

const categories = [
    { id: 1, name: 'Action'} , // 1
    { id: 2, name: 'Sport'} , // 2
    { id: 3, name: 'Racing'}, // 3
    { id: 4, name: 'MOBA'}, // 4
];

const developers = [
    { id: 1, name: 'Codemasters', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123208858075226/1.png'} ,
    { id: 2, name: 'EA', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123209386573834/3.png'} ,
    { id: 3, name: 'Rockstar', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123210506444872/7.png'} ,
    { id: 4, name: 'Riot Games', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123210225434655/6.png'} ,
    { id: 5, name: 'Playground Games', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123209634033744/4.png'} ,
    { id: 6, name: 'Mediatronic Games', image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016123209910853713/5.png'}
];

const users = [
    { id: 1, name: 'Admin', surname: 'Admin', email: 'admin@gmail.com', password: bcrypt.hashSync('admin123', 10), confirmPassword: 'admin', confirmed: true, idRole: 1, image: 'admin.jpg' },
    { id: 2, name: 'User', surname: 'User', email: 'user@gmail.com', password: bcrypt.hashSync('user123', 10), confirmPassword: 'user', confirmed: true, idRole: 2, image: 'user.jpg' },
];

const games = [
    {
        id: 1,
        name: 'Fifa 23', 
        idCategory: 2,
        idDeveloper: 2,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128378186768475/8.png',
        valoration: 4.5,
        description: 'FIFA 23 es un videojuego de fútbol desarrollado por EA Vancouver y EA Salt Lake y publicado por EA Sports. Es la vigésimo tercera entrega de la serie FIFA y se lanzó el 1 de octubre de 2022 para PlayStation 5, PlayStation 4, Xbox Series X, Xbox Series S, Xbox One, Nintendo Switch, Google Stadia y Microsoft Windows.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zMyeAFzCTM0?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: false,
        date: '2022-10-01'
    },
    {
        id: 2,
        name: 'Fifa 22',
        idCategory: 2,
        idDeveloper: 2,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128346016460861/3.png',
        valoration: 4.5,
        description: 'FIFA 22 es un videojuego de fútbol desarrollado por EA Vancouver y EA Salt Lake y publicado por EA Sports. Es la vigésimo segunda entrega de la serie FIFA y se lanzó el 1 de octubre de 2021 para PlayStation 5, PlayStation 4, Xbox Series X, Xbox Series S, Xbox One, Nintendo Switch, Google Stadia y Microsoft Windows.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/SYsi5QuOJNE?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 3,
        name: 'NBA 2K23', 
        idCategory: 2,
        idDeveloper: 2,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128380581728328/12.png',
        valoration: 4.5,
        description: 'NBA 2K23 es un videojuego de baloncesto desarrollado por Visual Concepts y publicado por 2K Sports. Es la vigésimo tercera entrega de la serie NBA 2K y se lanzó el 10 de septiembre de 2022 para PlayStation 5, PlayStation 4, Xbox Series X, Xbox Series S, Xbox One, Nintendo Switch, Google Stadia y Microsoft Windows.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RxLS5Tgo9YM?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: false,
        date: '2022-10-01'
    },
    {
        id: 4,
        name: 'NBA 2K22',
        idCategory: 2,
        idDeveloper: 2,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128381131161610/13.png',
        valoration: 4.5,
        description: 'NBA 2K22 es un videojuego de baloncesto desarrollado por Visual Concepts y publicado por 2K Sports. Es la vigésimo segunda entrega de la serie NBA 2K y se lanzó el 10 de septiembre de 2021 para PlayStation 5, PlayStation 4, Xbox Series X, Xbox Series S, Xbox One, Nintendo Switch, Google Stadia y Microsoft Windows.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/u67ylMtNGLU?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 5,
        name: 'GTA V', 
        idCategory: 1,
        idDeveloper: 3,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128347799040031/6.png',
        valoration: 4,
        description: 'Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto desarrollado por Rockstar North y publicado por Rockstar Games. Es el quinto título principal de la serie Grand Theft Auto y se lanzó inicialmente en 2013 para PlayStation 3 y Xbox 360, seguido por una versión para PlayStation 4 y Xbox One en 2014 y una versión para Microsoft Windows en 2015.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/QkkoHAzjnUs?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 6,
        name: 'Valorant', 
        idCategory: 1,
        idDeveloper: 4,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128378874646578/9.png',
        valoration: 2,
        description: 'Valorant es un videojuego de disparos en primera persona multijugador en línea desarrollado y publicado por Riot Games. El juego se lanzó el 2 de junio de 2020 para Microsoft Windows. El juego es gratuito para jugar, pero los jugadores pueden comprar paquetes de contenido adicional.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ey770ez6ROk?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 7,
        name: 'F1 22', 
        idCategory: 3,
        idDeveloper: 2,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128379981930516/11.png',
        valoration: 5,
        description: 'F1 2022 es un videojuego de carreras de automóviles desarrollado por Codemasters Birmingham y publicado por Codemasters. Es la vigésimo segunda entrega de la serie F1 y se lanzó el 16 de julio de 2022 para PlayStation 5, PlayStation 4, Xbox Series X, Xbox Series S, Xbox One, Nintendo Switch, Google Stadia y Microsoft Windows.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/YgOi41qmlc4?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 8,
        name: 'Cyberpunk 2077',
        idCategory: 1,
        idDeveloper: 3,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128344980463667/1.png',
        valoration: 3,
        description: 'Cyberpunk 2077 es un videojuego de rol de acción y mundo abierto desarrollado y publicado por CD Projekt. Es el cuarto juego de la serie Cyberpunk, y se lanzó el 10 de diciembre de 2020 para PlayStation 4, Xbox One y Microsoft Windows, con versiones para PlayStation 5 y Xbox Series X/S lanzadas el 10 de diciembre de 2021.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qIcTM8WXFjk?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: false,
        date: '2022-10-01'
    },
    {
        id: 9,
        name: 'Fall Guys',
        idCategory: 1,
        idDeveloper: 6,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128345521541271/2.png',
        valoration: 4,
        description: 'Fall Guys: Ultimate Knockout es un videojuego de acción y deportes desarrollado por Mediatonic y publicado por Devolver Digital. Es un juego multijugador masivo en línea en el que hasta 60 jugadores compiten en una serie de minijuegos para ser el último jugador en pie.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Wj3dUvGLjNQ?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 10,
        name: 'Forza Horizon 4',
        idCategory: 3,
        idDeveloper: 5,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128346540736522/4.png',
        valoration: 5,
        description: 'Forza Horizon 4 es un videojuego de carreras de automóviles desarrollado por Playground Games y publicado por Microsoft Studios. Es el cuarto título de la serie Forza Horizon y el decimotercero de la serie Forza, lanzado el 2 de octubre de 2018 para Xbox One y Microsoft Windows después de un lanzamiento exclusivo para Xbox One y Windows 10 el 28 de septiembre de 2016.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MHKqOVAjdgw?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 11,
        name: 'Forza Horizon 5',
        idCategory: 3,
        idDeveloper: 5,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128347174092880/5.png',
        valoration: 5,
        description: 'Forza Horizon 5 es un videojuego de carreras de automóviles desarrollado por Playground Games y publicado por Microsoft Studios. Es el quinto título de la serie Forza Horizon y el decimocuarto de la serie Forza, lanzado el 9 de noviembre de 2021 para Xbox Series X/S y Microsoft Windows después de un lanzamiento exclusivo para Xbox One y Windows 10 el 28 de septiembre de 2016.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FYH9n37B7Yw?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: false,
        date: '2022-10-01'
    },
    {
        id: 12,
        name: 'League of Legends',
        idCategory: 4,
        idDeveloper: 4,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128344342921246/7.png',
        valoration: 5,
        description: 'League of Legends es un videojuego de estrategia en línea y multijugador masivo desarrollado y publicado por Riot Games para Microsoft Windows y macOS. Es un juego gratuito para jugar, pero los jugadores pueden comprar paquetes de contenido adicional.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7O21Z6vgtmY?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    },
    {
        id: 13,
        name: 'Read Dead Redemption 2',
        idCategory: 1,
        idDeveloper: 3,
        image: 'https://cdn.discordapp.com/attachments/852889034723426324/1016128379419897996/10.png',
        valoration: 5,
        description: 'Red Dead Redemption 2 es un videojuego de acción-aventura western desarrollado y publicado por Rockstar Games. Es la secuela de Red Dead Redemption, y se lanzó el 26 de octubre de 2018 para PlayStation 4 y Xbox One, y el 5 de noviembre de 2019 para Microsoft Windows y Stadia.',
        trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MyaYlbizpvs?autoplay=1&mute=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        isAvailable: true
    }
];

const usergames  = [
    { idUser: 1, idGame: 1 },
    { idUser: 1, idGame: 2 },
    { idUser: 1, idGame: 3 },

    { idUser: 2, idGame: 4 },
    { idUser: 2, idGame: 5 },
];

module.exports = {
    roles,
    categories,
    developers,
    users,
    games,
    usergames
};