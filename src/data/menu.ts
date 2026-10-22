type Bilingual = { fr: string; en: string };

export type MenuItem = {
  name: Bilingual;
  note?: Bilingual;
  price: string;
  /** Nom du fichier dans public/images/produits-picture (sans .jpg), affiché au survol. */
  photo: string;
};

export type MenuSection = {
  title: Bilingual;
  items: MenuItem[];
};

export type MenuCategory = {
  id: "coffee" | "brunch" | "sweets";
  title: Bilingual;
  sections: MenuSection[];
};

const b = (fr: string, en: string): Bilingual => ({ fr, en });

// Prix et intitulés repris de la maquette du menu.
export const menu: MenuCategory[] = [
  {
    id: "coffee",
    title: b("Café", "Coffee"),
    sections: [
      {
        title: b("Les basiques", "The basics"),
        items: [
          { name: b("Le Court", "The Short"), note: b("espresso", "espresso"), price: "3" , photo: "le-court" },
          { name: b("Le Long", "The Long"), note: b("allongé", "americano"), price: "5" , photo: "le-long" },
          { name: b("La Noisette", "The Noisette"), note: b("espresso, une goutte de lait", "espresso, a drop of milk"), price: "4" , photo: "la-noisette" },
          { name: b("Le Nuage", "The Cloud"), note: b("cappuccino", "cappuccino"), price: "4" , photo: "le-nuage" },
          { name: b("Le Velours", "The Velvet"), note: b("flat white", "flat white"), price: "4" , photo: "le-velours" },
        ],
      },
      {
        title: b("Les signatures", "The signatures"),
        items: [
          { name: b("Latte Miel", "Honey Latte"), note: b("espresso, lait, fleur d'oranger, chaud ou glacé", "espresso, milk, orange blossom, hot or iced"), price: "4" , photo: "latte-miel" },
          { name: b("Cannelle & Miel", "Cinnamon & Honey"), note: b("cappuccino, miel, cannelle", "cappuccino, honey, cinnamon"), price: "5" , photo: "cannelle-miel" },
          { name: b("Tonic Miel", "Honey Tonic"), note: b("espresso tonic, zeste d'orange", "espresso tonic, orange zest"), price: "4" , photo: "tonic-miel" },
        ],
      },
      {
        title: b("Cold brew", "Cold brew"),
        items: [
          { name: b("Nature", "Classic"), note: b("infusé à froid 18h", "cold-steeped for 18h"), price: "3,5" , photo: "cold-brew-nature" },
          { name: b("Vanille", "Vanilla"), note: b("crème vanille fouettée", "whipped vanilla cream"), price: "5" , photo: "cold-brew-vanille" },
          { name: b("Agrumes", "Citrus"), note: b("orange et citron", "orange and lemon"), price: "4" , photo: "cold-brew-agrumes" },
          { name: b("Le cold brew du moment", "Cold brew of the moment"), note: b("fruit de saison", "seasonal fruit"), price: "6" , photo: "cold-brew-du-moment" },
        ],
      },
    ],
  },
  {
    id: "brunch",
    title: b("Brunch", "Brunch"),
    sections: [
      {
        title: b("Les salés", "Savory"),
        items: [
          { name: b("La Tartine du Matin", "The Morning Toast"), note: b("pain aux graines, avocat écrasé, œuf poché, jeunes pousses", "seeded bread, smashed avocado, poached egg, microgreens"), price: "6" , photo: "la-tartine-du-matin" },
          { name: b("La Fumée", "The Smoke"), note: b("pain au levain, saumon fumé, fromage frais à l'aneth, câpres", "sourdough, smoked salmon, dill cream cheese, capers"), price: "7" , photo: "la-fumee" },
          { name: b("Le Figuier", "The Fig Tree"), note: b("pain au levain, chèvre frais, figues rôties, noix, miel de thym", "sourdough, fresh goat cheese, roasted figs, walnuts, thyme honey"), price: "7" , photo: "le-figuier" },
          { name: b("Les Œufs du Dimanche", "Sunday Eggs"), note: b("œufs brouillés crémeux, pain grillé, ciboulette", "creamy scrambled eggs, toast, chives"), price: "8" , photo: "les-oeufs-du-dimanche" },
        ],
      },
      {
        title: b("Les sucrés", "Sweet"),
        items: [
          { name: b("Pancakes Bleuets", "Blue Stack"), note: b("pancakes moelleux, myrtilles fraîches, citron, sirop doré", "fluffy pancakes, fresh blueberries, lemon, golden syrup"), price: "6" , photo: "pancakes-bleuets" },
          { name: b("La Brioche Dorée", "The Golden Brioche"), note: b("brioche perdue, crème vanille, fruits rouges, sucre muscovado", "French toast, vanilla cream, red berries, muscovado sugar"), price: "6" , photo: "la-brioche-doree" },
          { name: b("Le Bol du Matin", "The Morning Bowl"), note: b("yaourt, granola maison, fruits de saison, miel", "yogurt, homemade granola, seasonal fruit, honey"), price: "7" , photo: "le-bol-du-matin" },
        ],
      },
      {
        title: b("Pour accompagner", "On the side"),
        items: [
          { name: b("Jus pressé du jour", "Fresh juice of the day"), note: b("orange ou pomme-gingembre", "orange or apple-ginger"), price: "3" , photo: "jus-presse" },
          { name: b("Panier de viennoiseries", "Pastry basket"), note: b("croissant, pain au chocolat", "croissant, pain au chocolat"), price: "6" , photo: "panier-viennoiseries" },
        ],
      },
    ],
  },
  {
    id: "sweets",
    title: b("Dessert", "Dessert"),
    sections: [
      {
        title: b("Les viennoiseries", "Pastries"),
        items: [
          { name: b("Croissant", "Croissant"), note: b("pur beurre", "all butter"), price: "2,5" , photo: "croissant" },
          { name: b("Pain au chocolat", "Pain au chocolat"), note: b("chocolat noir", "dark chocolate"), price: "2,5" , photo: "pain-au-chocolat" },
          { name: b("Le Roulé Doré", "The Golden Swirl"), note: b("brioche tiède à la cannelle, glaçage au miel", "warm cinnamon brioche, honey glaze"), price: "4" , photo: "le-roule-dore" },
          { name: b("Le Chausson du Moment", "The Turnover of the Moment"), note: b("fruits de saison", "seasonal fruit"), price: "4" , photo: "le-chausson-du-moment" },
        ],
      },
      {
        title: b("Les gâteaux", "Cakes"),
        items: [
          { name: b("Le Cake du Jour", "Cake of the Day"), note: b("demande au comptoir", "ask at the counter"), price: "5" , photo: "le-cake-du-jour" },
          { name: b("Le Citron Pavot", "Lemon Poppy"), note: b("cake moelleux, glaçage citron", "soft cake, lemon glaze"), price: "5" , photo: "le-citron-pavot" },
          { name: b("Le Brownie", "The Brownie"), note: b("chocolat noir, noix de pécan", "dark chocolate, pecans"), price: "4" , photo: "le-brownie" },
          { name: b("La Carotte", "The Carrot"), note: b("carrot cake, glaçage fromage frais", "carrot cake, cream cheese frosting"), price: "5" , photo: "la-carotte" },
        ],
      },
      {
        title: b("Les petites envies", "Little cravings"),
        items: [
          { name: b("Cookie", "Cookie"), note: b("chocolat et fleur de sel", "chocolate and sea salt"), price: "3" , photo: "cookie" },
          { name: b("Financier", "Financier"), note: b("amande, beurre noisette", "almond, brown butter"), price: "3" , photo: "financier" },
          { name: b("Tarte aux Fruits", "Fruit Tart"), note: b("pâte sablée, crème d'amande", "shortcrust, almond cream"), price: "4" , photo: "tarte-aux-fruits" },
        ],
      },
    ],
  },
];
