import babyYoda from '../assets/img/StarWars_Baby_Yoda.png';
import vulpix from '../assets/img/Pokemon_Vulpix.png';
import snapePatronus from '../assets/img/HarryPotter_Snape_Patronus.png';
import narutoShippuden from '../assets/img/Naruto_Naruto_Shippuden.jpg';

class LicensePresentation {
    constructor(title, description, img) {
      this.title = title;
      this.description = description;
      this.img = img;
    }
  }

  const presentationArr = [
    new LicensePresentation(<>Star Wars & <br />The Mandalorian</>, "Disfruta de una saga que sigue agregando personajes a su colección.", babyYoda), 
    new LicensePresentation("Pokemon", "Atrapa todos los que puedas y disfruta de una colección llena de amigos.", vulpix), 
    new LicensePresentation("Harry Potter", "Revive los recuerdos de una saga llena de magia y encanto.", snapePatronus),
    new LicensePresentation("Naruto Shippuden", "Sumérgete en un universo de ninjas legendarios y otros seres misteriosos.", narutoShippuden)
  ];

export default presentationArr