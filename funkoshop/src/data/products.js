import babyYoda from '../assets/img/StarWars_Baby_Yoda.png';
import babyYodaBack from '../assets/img/StarWars_Baby_Yoda_box.jpeg';
import stormtrooper from '../assets/img/StarWars_Stormtrooper.png';
import stormtrooperBack from '../assets/img/StarWars_Stormtrooper_box.png';
import ahsoka from '../assets/img/StarWars_Ahsoka.png';
import ahsokaBack from '../assets/img/StarWars_Ahsoka_box.png';
import chewbacca from '../assets/img/StarWars_Chewbacca.jpg';
import chewbaccaBack from '../assets/img/StarWars_Chewbacca_box.jpg';
import r2d2 from '../assets/img/StarWars_R2D2.png';
import r2d2Back from '../assets/img/StarWars_R2D2_box.png';
import harryPotter from '../assets/img/HarryPotter_Harry_Potter.png';
import harryPotterBack from '../assets/img/HarryPotter_Harry_Potter_box.png';
import hermioneGranger from '../assets/img/HarryPotter_Hermione_Granger.png';
import hermioneGrangerBack from '../assets/img/HarryPotter_Hermione_Granger_box.png';
import ronWeasley from '../assets/img/HarryPotter_Ron_Weasley.png';
import ronWeasleyBack from '../assets/img/HarryPotter_Ron_Weasley_box.png';
import lunaLionmask from '../assets/img/HarryPotter_Luna_Lionmask.png';
import lunaLionmaskBack from '../assets/img/HarryPotter_Luna_Lionmask_box.png';
import snapePatronus from '../assets/img/HarryPotter_Snape_Patronus.png';
import snapePatronusBack from '../assets/img/HarryPotter_Snape_Patronus_box.png';
import kakashiHatake from '../assets/img/Naruto_Kakashi_Hatake.png';
import kakashiHatakeBack from '../assets/img/Naruto_Kakashi_Hatake_box.png';
import narutoShippuden from '../assets/img/Naruto_Naruto_Shippuden.jpg';
import narutoShippudenBack from '../assets/img/Naruto_Naruto_Shippuden_box.png';
import sakura from '../assets/img/Naruto_Sakura.png';
import sakuraBack from '../assets/img/Naruto_Sakura_box.png';
import sasukeUchihaFirstSusano from '../assets/img/Naruto_Sasuke_Uchiha_First_Susano.png';
import sasukeUchihaFirstSusanoBack from '../assets/img/Naruto_Sasuke_Uchiha_First_Susano_box.png';
import jiraiya from '../assets/img/Naruto_Jiraiya.png';
import jiraiyaBack from '../assets/img/Naruto_Jiraiya_box.png';
import pidgeotto from '../assets/img/Pokemon_Pidgeotto.png';
import pidgeottoBack from '../assets/img/Pokemon_Pidgeotto_box.png';
import pikachu from '../assets/img/Pokemon_Pikachu.jpg';
import pikachuBack from '../assets/img/Pokemon_Pikachu_box.jpg';
import vulpix from '../assets/img/Pokemon_Vulpix.png';
import vulpixBack from '../assets/img/Pokemon_Vulpix_box.jpg';
import mew from '../assets/img/Pokemon_Mew.png';
import mewBack from '../assets/img/Pokemon_Mew_box.png';
import mewtwo from '../assets/img/Pokemon_Mewtwo.png';
import mewtwoBack from '../assets/img/Pokemon_Mewtwo_box.png';

class Product {
    constructor(id, sku, nameProduct, collection, license, description, price, paymentMethods, discounts, frontImg, backImg, isNew, isSpecialEdition, isFavorite) {
      this.id = id;
      this.sku = sku;
      this.nameProduct = nameProduct;
      this.collection = collection;
      this.license = license;
      this.description = description;
      this.price = price;
      this.paymentMethods = paymentMethods;
      this.discounts = discounts;
      this.frontImg = frontImg;
      this.backImg = backImg;
      this.isNew = isNew;
      this.isSpecialEdition = isSpecialEdition;
      this.isFavorite = isFavorite;
    }
  }

const productsArr = [
  new Product(1, "STW001001", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 
  new Product(2, "STW001002", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 
  new Product(3, "STW001003", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 
  new Product(4, "STW001004", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 
  new Product(5, "STW001005", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 

  new Product( 6, "STW002001", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 7, "STW002002", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 8, "STW002003", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 9, "STW002004", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product(10, "STW002005", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 

  new Product(11, "STW003001", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(12, "STW003002", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(13, "STW003003", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(14, "STW003004", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(15, "STW003005", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 

  new Product(16, "STW004001", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(17, "STW004002", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(18, "STW004003", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(19, "STW004004", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(20, "STW004005", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 

  new Product(21, "STW005001", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(22, "STW005002", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(23, "STW005003", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(24, "STW005004", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(25, "STW005005", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 

  new Product(26, "NAR001001", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(27, "NAR001002", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(28, "NAR001003", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(29, "NAR001004", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(30, "NAR001005", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 

  new Product(31, "NAR002001", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(32, "NAR002002", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(33, "NAR002003", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(34, "NAR002004", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(35, "NAR002005", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
    
  new Product(36, "NAR003001", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(37, "NAR003002", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(38, "NAR003003", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(39, "NAR003004", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(40, "NAR003005", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 

  new Product(41, "NAR004001", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(42, "NAR004002", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(43, "NAR004003", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(44, "NAR004004", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(45, "NAR004005", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 

  new Product(46, "NAR005001", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(47, "NAR005002", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(48, "NAR005003", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(49, "NAR005004", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(50, "NAR005005", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 

  new Product(51, "HPT001001", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(52, "HPT001002", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(53, "HPT001003", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(54, "HPT001004", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(55, "HPT001005", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 

  new Product(56, "HPT002001", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(57, "HPT002002", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(58, "HPT002003", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(59, "HPT002004", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(60, "HPT002005", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 

  new Product(61, "HPT003001", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(62, "HPT003002", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(63, "HPT003003", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(64, "HPT003004", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(65, "HPT003005", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 

  new Product(66, "HPT004001", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(67, "HPT004002", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(68, "HPT004003", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(69, "HPT004004", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(70, "HPT004005", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 

  new Product(71, "HPT005001", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(72, "HPT005002", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(73, "HPT005003", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(74, "HPT005004", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(75, "HPT005005", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 

  new Product(76, "PKM001001", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(77, "PKM001002", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(78, "PKM001003", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(79, "PKM001004", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(80, "PKM001005", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 

  new Product(81, "PKM002001", "Mew", "Figuras", "Pokemon", "Figura Funko coleccionable de Mew de la saga Pokemon.", 39.99, [1, 3, 6], 5, mew, mewBack, true, true, false), 
  new Product(82, "PKM002002", "Mew", "Figuras", "Pokemon", "Figura Funko coleccionable de Mew de la saga Pokemon.", 39.99, [1, 3, 6], 5, mew, mewBack, true, true, false), 
  new Product(83, "PKM002003", "Mew", "Figuras", "Pokemon", "Figura Funko coleccionable de Mew de la saga Pokemon.", 39.99, [1, 3, 6], 5, mew, mewBack, true, true, false), 
  new Product(84, "PKM002004", "Mew", "Figuras", "Pokemon", "Figura Funko coleccionable de Mew de la saga Pokemon.", 39.99, [1, 3, 6], 5, mew, mewBack, true, true, false), 
  new Product(85, "PKM002005", "Mew", "Figuras", "Pokemon", "Figura Funko coleccionable de Mew de la saga Pokemon.", 39.99, [1, 3, 6], 5, mew, mewBack, true, true, false), 

  new Product(86, "PKM003001", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(87, "PKM003002", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(88, "PKM003003", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(89, "PKM003004", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(90, "PKM003005", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false),     

  new Product(91, "PKM004001", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(92, "PKM004002", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(93, "PKM004003", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(94, "PKM004004", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(95, "PKM004005", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 

  new Product( 96, "PKM005001", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 97, "PKM005002", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 98, "PKM005003", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 99, "PKM005004", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product(100, "PKM005005", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false)
];

const productsArr2 = [
  new Product(4, "STW001004", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 
  new Product(5, "STW001005", "Baby Yoda Blueball", "Figuras", "Star Wars", "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.", 49.99, [1, 3, 6, 12], 0, babyYoda, babyYodaBack, true, true, true), 

  new Product( 6, "STW002001", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 7, "STW002002", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 8, "STW002003", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product( 9, "STW002004", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 
  new Product(10, "STW002005", "Chewbacca", "Figuras", "Star Wars", "Figura Funko coleccionable de Chewbacca de la saga Star Wars sosteniendo una ballesta." , 39.99, [1, 3, 6], 5, chewbacca, chewbaccaBack, true, true, false), 

  new Product(11, "STW003001", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(12, "STW003002", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(13, "STW003003", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(14, "STW003004", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 
  new Product(15, "STW003005", "R2D2", "Figuras", "Star Wars", "Figura Funko coleccionable de R2D2 de la saga Star Wars" , 39.99, [1, 3, 6], 5, r2d2, r2d2Back, true, true, false), 

  new Product(16, "STW004001", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(17, "STW004002", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(18, "STW004003", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(19, "STW004004", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 
  new Product(20, "STW004005", "Ahsoka", "Figuras", "Star Wars", "Figura Funko coleccionable de Ahsoka de la saga Star Wars sosteniendo dos sables de luz." , 29.99, [1], 10, ahsoka, ahsokaBack, true, false, false), 

  new Product(21, "STW005001", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(22, "STW005002", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(23, "STW005003", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(24, "STW005004", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 
  new Product(25, "STW005005", "Stormtrooper Lightsaber", "Figuras", "Star Wars", "Figura Funko coleccionable de un Stormtrooper de la saga Star Wars sosteniendo un sable de luz." , 29.99, [1], 10, stormtrooper, stormtrooperBack, true, false, false), 

  new Product(28, "NAR001003", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(29, "NAR001004", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 
  new Product(30, "NAR001005", "Naruto", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.", 49.99, [1, 3, 6, 12], 0, narutoShippuden, narutoShippudenBack, true, true, true), 

  new Product(31, "NAR002001", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(32, "NAR002002", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(33, "NAR002003", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(34, "NAR002004", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
  new Product(35, "NAR002005", "Sakura", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sakura de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sakura, sakuraBack, true, true, false), 
    
  new Product(36, "NAR003001", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(37, "NAR003002", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(38, "NAR003003", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(39, "NAR003004", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 
  new Product(40, "NAR003005", "Sasuke Uchiha First Susano", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Sasuke Uchiha en modo Susano de la saga Naruto Shippuden.", 39.99, [1, 3, 6], 5, sasukeUchihaFirstSusano, sasukeUchihaFirstSusanoBack, true, true, false), 

  new Product(41, "NAR004001", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(42, "NAR004002", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(43, "NAR004003", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(44, "NAR004004", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 
  new Product(45, "NAR004005", "Kakashi Hatake", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Kakashi Hatake de la saga Naruto Shippuden.", 29.99, [1], 10, kakashiHatake, kakashiHatakeBack, true, false, false), 

  new Product(46, "NAR005001", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(47, "NAR005002", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(48, "NAR005003", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(49, "NAR005004", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 
  new Product(50, "NAR005005", "Jiraiya", "Figuras", "Naruto Shippuden", "Figura Funko coleccionable de Jiraiya de la saga Naruto Shippuden haciendo un Rasengan.", 29.99, [1], 10, jiraiya, jiraiyaBack, true, false, false), 

  new Product(52, "HPT001002", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(53, "HPT001003", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(54, "HPT001004", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 
  new Product(55, "HPT001005", "Harry Potter", "Figuras", "Harry Potter", "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.", 49.99, [1, 3, 6, 12], 0, harryPotter, harryPotterBack, true, true, true), 

  new Product(56, "HPT002001", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(57, "HPT002002", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(58, "HPT002003", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(59, "HPT002004", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 
  new Product(60, "HPT002005", "Hermione Granger", "Figuras", "Harry Potter", "Figura Funko coleccionable de Hermione Granger de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, hermioneGranger, hermioneGrangerBack, true, true, false), 

  new Product(61, "HPT003001", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(62, "HPT003002", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(63, "HPT003003", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(64, "HPT003004", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 
  new Product(65, "HPT003005", "Ron Weasley", "Figuras", "Harry Potter", "Figura Funko coleccionable de Ron Weasley de la saga Harry Potter portando una varita.", 39.99, [1, 3, 6], 5, ronWeasley, ronWeasleyBack, true, true, false), 

  new Product(66, "HPT004001", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(67, "HPT004002", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(68, "HPT004003", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(69, "HPT004004", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 
  new Product(70, "HPT004005", "Luna Lovegood Lion Mask", "Figuras", "Harry Potter", "Figura Funko coleccionable de Luna Lovegood de la saga Harry Potter usando una máscara de león.", 29.99, [1], 10, lunaLionmask, lunaLionmaskBack, true, false, false), 

  new Product(71, "HPT005001", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(72, "HPT005002", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(73, "HPT005003", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(74, "HPT005004", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 
  new Product(75, "HPT005005", "Snape Patronus", "Figuras", "Harry Potter", "Figura Funko coleccionable de la forma del patronus del profesor Severus Snape de la saga Harry Potter.", 29.99, [1], 10, snapePatronus, snapePatronusBack, true, false, false), 

  new Product(76, "PKM001001", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(77, "PKM001002", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(78, "PKM001003", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(79, "PKM001004", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 
  new Product(80, "PKM001005", "Pikachu", "Figuras", "Pokemon", "Figura Funko coleccionable de Pikachu de la saga Pokemon.", 49.99, [1, 3, 6, 12], 0, pikachu, pikachuBack, true, true, true), 

  new Product(86, "PKM003001", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(87, "PKM003002", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(88, "PKM003003", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(89, "PKM003004", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false), 
  new Product(90, "PKM003005", "Mewtwo", "Figuras", "Pokemon", "Figura Funko coleccionable de Mewtwo de la saga Pokemon.", 39.99, [1, 3, 6], 5, mewtwo, mewtwoBack, true, true, false),     

  new Product(91, "PKM004001", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(92, "PKM004002", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(93, "PKM004003", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(94, "PKM004004", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 
  new Product(95, "PKM004005", "Pidgeotto", "Figuras", "Pokemon", "Figura Funko coleccionable de Pidgeotto de la saga Pokemon.", 29.99, [1], 10, pidgeotto, pidgeottoBack, true, false, false), 

  new Product( 96, "PKM005001", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 97, "PKM005002", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 98, "PKM005003", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product( 99, "PKM005004", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false), 
  new Product(100, "PKM005005", "Vulpix", "Figuras", "Pokemon", "Figura Funko coleccionable de Vulpix de la saga Pokemon.", 29.99, [1], 10, vulpix, vulpixBack, true, false, false)
];

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
export	{ uniqueProductsArr, productsArr2 }