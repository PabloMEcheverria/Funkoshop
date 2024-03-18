import babyYoda from '../assets/img/StarWars_Baby_Yoda.png';
import babyYodaBack from '../assets/img/StarWars_Baby_Yoda_box.jpeg';
import stormtrooper from '../assets/img/StarWars_Stormtrooper.png';
import stormtrooperBack from '../assets/img/StarWars_Stormtrooper_box.png';
import lunaLionmask from '../assets/img/HarryPotter_Luna_Lionmask.png';
import lunaLionmaskBack from '../assets/img/HarryPotter_Luna_Lionmask_box.png';
import snapePatronus from '../assets/img/HarryPotter_Snape_Patronus.png';
import snapePatronusBack from '../assets/img/HarryPotter_Snape_Patronus_box.png';
import kakashiHatake from '../assets/img/Naruto_Kakashi_Hatake.png';
import kakashiHatakeBack from '../assets/img/Naruto_Kakashi_Hatake_box.png';
import narutoShippuden from '../assets/img/Naruto_Naruto_Shippuden.jpg';
import narutoShippudenBack from '../assets/img/Naruto_Naruto_Shippuden_box.jpg';
import pidgeotto from '../assets/img/Pokemon_Pidgeotto.png';
import pidgeottoBack from '../assets/img/Pokemon_Pidgeotto_box.png';
import pikachu from '../assets/img/Pokemon_Pikachu.jpg';
import pikachuBack from '../assets/img/Pokemon_Pikachu_box.jpg';
import vulpix from '../assets/img/Pokemon_Vulpix.png';
import vulpixBack from '../assets/img/Pokemon_Vulpix_box.jpg';

class Product {
    constructor(id, sku, nameProduct, category, license, description, price, paymentMethods, discounts, frontImg, backImg, isNew) {
      this.id = id;
      this.sku = sku;
      this.nameProduct = nameProduct;
      this.collection = category;
      this.license = license;
      this.description = description;
      this.price = price;
      this.paymentMethods = paymentMethods;
      this.discounts = discounts;
      this.frontImg = frontImg;
      this.backImg = backImg;
      this.isNew = isNew;
    }
  }

const productsArr = [
    new Product(1, "STW001001", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura Funko coleccionable de Baby Yoda de la saga Star Wars sosteniendo la Shifter Knob.", 1799.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true), 
    new Product(2, "STW001002", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura Funko coleccionable de Baby Yoda de la saga Star Wars sosteniendo la Shifter Knob.", 1799.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true), 
    new Product(3, "STW001003", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura Funko coleccionable de Baby Yoda de la saga Star Wars sosteniendo la Shifter Knob.", 1799.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true), 
    new Product(4, "STW001004", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura Funko coleccionable de Baby Yoda de la saga Star Wars sosteniendo la Shifter Knob.", 1799.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true), 
    new Product(5, "STW001005", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura Funko coleccionable de Baby Yoda de la saga Star Wars sosteniendo la Shifter Knob.", 1799.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true), 
    new Product(6, "STW002001", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 1799.99, [1, 3, 6, 12], 0, stormtrooper, stormtrooperBack, true), 
    new Product(7, "STW002002", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 1799.99, [1, 3, 6, 12], 0, stormtrooper, stormtrooperBack, true), 
    new Product(8, "STW002003", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 1799.99, [1, 3, 6, 12], 0, stormtrooper, stormtrooperBack, true), 
    new Product(9, "STW002004", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 1799.99, [1, 3, 6, 12], 0, stormtrooper, stormtrooperBack, true), 
    new Product(10, "STW002005", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 1799.99, [1, 3, 6, 12], 0, stormtrooper, stormtrooperBack, true), 
    new Product(11, "NAR001001", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true), 
    new Product(12, "NAR001002", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true), 
    new Product(13, "NAR001003", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true), 
    new Product(14, "NAR001004", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true), 
    new Product(15, "NAR001005", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true), 
    new Product(16, "NAR002001", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, kakashiHatake, kakashiHatakeBack, true), 
    new Product(17, "NAR002002", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, kakashiHatake, kakashiHatakeBack, true), 
    new Product(18, "NAR002003", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, kakashiHatake, kakashiHatakeBack, true), 
    new Product(19, "NAR002004", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, kakashiHatake, kakashiHatakeBack, true), 
    new Product(20, "NAR002005", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 1799.99, [1, 3, 6, 12], 0, kakashiHatake, kakashiHatakeBack, true), 
    new Product(21, "HPT001001", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 1799.99, [1, 3, 6, 12], 0, lunaLionmask, lunaLionmaskBack, true), 
    new Product(22, "HPT001002", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 1799.99, [1, 3, 6, 12], 0, lunaLionmask, lunaLionmaskBack, true), 
    new Product(23, "HPT001003", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 1799.99, [1, 3, 6, 12], 0, lunaLionmask, lunaLionmaskBack, true), 
    new Product(24, "HPT001004", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 1799.99, [1, 3, 6, 12], 0, lunaLionmask, lunaLionmaskBack, true), 
    new Product(25, "HPT001005", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 1799.99, [1, 3, 6, 12], 0, lunaLionmask, lunaLionmaskBack, true), 
    new Product(26, "HPT002001", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 1799.99, [1, 3, 6, 12], 0, snapePatronus, snapePatronusBack, true), 
    new Product(27, "HPT002002", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 1799.99, [1, 3, 6, 12], 0, snapePatronus, snapePatronusBack, true), 
    new Product(28, "HPT002003", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 1799.99, [1, 3, 6, 12], 0, snapePatronus, snapePatronusBack, true), 
    new Product(29, "HPT002004", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 1799.99, [1, 3, 6, 12], 0, snapePatronus, snapePatronusBack, true), 
    new Product(30, "HPT002005", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 1799.99, [1, 3, 6, 12], 0, snapePatronus, snapePatronusBack, true), 
    new Product(31, "PKM001001", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pidgeotto, pidgeottoBack, true), 
    new Product(32, "PKM001002", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pidgeotto, pidgeottoBack, true), 
    new Product(33, "PKM001003", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pidgeotto, pidgeottoBack, true), 
    new Product(34, "PKM001004", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pidgeotto, pidgeottoBack, true), 
    new Product(35, "PKM001005", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pidgeotto, pidgeottoBack, true), 
    new Product(36, "PKM002001", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true), 
    new Product(37, "PKM002002", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true), 
    new Product(38, "PKM002003", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true), 
    new Product(39, "PKM002004", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true), 
    new Product(40, "PKM002005", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true), 
    new Product(41, "PKM003001", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, vulpix, vulpixBack, true), 
    new Product(42, "PKM003002", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, vulpix, vulpixBack, true), 
    new Product(43, "PKM003003", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, vulpix, vulpixBack, true), 
    new Product(44, "PKM003004", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, vulpix, vulpixBack, true), 
    new Product(45, "PKM003005", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 1799.99, [1, 3, 6, 12], 0, vulpix, vulpixBack, true)
]

function removeDuplicated(arr) {
  let notDuplicatedArr = [];
  let unique = {};

  arr.forEach( product => {
      unique[product["nameProduct"]] = product;
  })

  for (let product in unique) {
      notDuplicatedArr.push(unique[product]);
  }

  return notDuplicatedArr
}

const uniqueProductsArr = removeDuplicated(productsArr);

export default productsArr
export	{ uniqueProductsArr }