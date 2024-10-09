<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Recipe;
use Database\Factories\RecipeFactory;
use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;



class RecipeSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
 /*
        $brasno = Ingredient::where('name', 'Brašno')->first();
        $paradajz = Ingredient::where('name', 'Paradajz')->first();
        $sir = Ingredient::where('name', 'Mocarela sir')->first();
        $tikvice = Ingredient::where('name', 'Tikvice')->first();
        $patlidzan = Ingredient::where('name', 'Patlidzan')->first();
        $kukuruznoBrasno = Ingredient::where('name', 'Kukuruzno brašno')->first();
        $voda = Ingredient::where('name', 'Voda')->first();
        $so = Ingredient::where('name', 'So')->first();
        $piletina = Ingredient::where('name', 'Piletina')->first();
        $mrkva = Ingredient::where('name', 'Mrkva')->first();
        $testenina = Ingredient::where('name', 'Testenina')->first();
        $krompir = Ingredient::where('name', 'Krompir')->first();
        $testeninaZaLazanje = Ingredient::where('name', 'Testenina')->first();
        $mlevenoMeso = Ingredient::where('name', 'Mleveno meso')->first();
        $crniLuk = Ingredient::where('name', 'Crni luk')->first();
        $paradajzSos = Ingredient::where('name', 'Paradajz sos')->first();
        $puter = Ingredient::where('name', 'Puter')->first();
        $mocarela = Ingredient::where('name', 'Mocarela sir')->first();
        $jagode = Ingredient::where('name', 'Jagoda')->first();
        $banane = Ingredient::where('name', 'Banana')->first();
        $jogurt = Ingredient::where('name', 'Jogurt')->first();
        $kakao = Ingredient::where('name', 'Kakao prah')->first();
        $zelenaSalata = Ingredient::where('name', 'Zelena salata')->first();
        $parmezan = Ingredient::where('name', 'Parmezan sir')->first();
        $krutoni = Ingredient::where('name', 'Krutoni')->first();
        $pileciFile = Ingredient::where('name', 'Piletina')->first();
        $jaja = Ingredient::where('name', 'Jaja')->first();
        $mleko = Ingredient::where('name', 'Mleko')->first();
        $secer = Ingredient::where('name', 'Šećer')->first();
        $pirinac = Ingredient::where('name', 'Pirinac')->first();
        $paprika = Ingredient::where('name', 'Paprika')->first();


        Recipe::create([
            'name' => 'Pizza',
            'description' => 'Ukusna pizza',
            'prep_time' => 30,
            'slika' => 'https://padariabandeirantes4.com.br/yl/wp-content/uploads/2015/09/pizza1-300x250.jpg',
            'opis' => 'Pripremite testo mešanjem brašna, vode, soli i malo ulja, pa ostavite da odstoji. Nakon što se testo podigne, razvucite ga i stavite na pleh. Preko testa rasporedite paradajz sos, pospite rendanom mocarelom i dodajte ostale sastojke. Pecite u prethodno zagrejanoj pećnici dok kora ne postane zlatno smeđa.',
        ]);

        $pizza = Recipe::where('name', 'Pizza')->first();

        $pizza->ingredients()->attach($brasno, ['quantity' => 300]);
        $pizza->ingredients()->attach($paradajz, ['quantity' => 2]);
        $pizza->ingredients()->attach($sir, ['quantity' => 200]);

        Recipe::create([
            'name' => 'Piletina sa povrćem',
            'description' => 'Zdravo i ukusno jelo sa piletinom i sezonskim povrćem.',
            'prep_time' => 45,
            'slika' => 'https://healthyfitnessmeals.com/wp-content/uploads/2022/02/Sheet-pan-Chicken-and-Veggies-7-500x500.jpg',
            'opis' => 'Na zagrejanom ulju propržite piletinu dok ne porumeni, a zatim dodajte seckano povrće (paradajz, paprika, krompir). Posolite, pobiberite i dodajte malo vode, pa poklopite. Kuvajte na laganoj vatri dok piletina ne omekša, a povrće ne bude skuvano.'
        ]);

        

        $piletinaSaPovrcem = Recipe::where('name', 'Piletina sa povrćem')->first();

        $piletinaSaPovrcem->ingredients()->attach($piletina, ['quantity' => 200]);
        $piletinaSaPovrcem->ingredients()->attach($paradajz, ['quantity' => 2]);
        $piletinaSaPovrcem->ingredients()->attach($paprika, ['quantity' => 200]);
        $piletinaSaPovrcem->ingredients()->attach($krompir, ['quantity' => 100]);


        Recipe::create([
            'name' => 'Pileća supa',
            'description' => 'Domaća pileća supa za okrepljenje',
            'prep_time' => 60,
            'slika' => 'https://recipes.net/wp-content/uploads/2023/07/spring-vegetable-broth-with-shredded-chicken_819094540604d3ee87b03361352d221b-300x250.jpeg',
            'opis' => 'U vodu stavite piletinu, krompir i mrkvu, a zatim dodajte testeninu. Kuvajte dok se meso ne skuva, a povrće ne omekša. Po želji, začinite solju i biberom.',
        ]);
        
        $soup = Recipe::where('name', 'Pileća supa')->first();
        
        $soup->ingredients()->attach($piletina, ['quantity' => 500]);
        $soup->ingredients()->attach($mrkva, ['quantity' => 2]);
        $soup->ingredients()->attach($krompir, ['quantity' => 3]);
        $soup->ingredients()->attach($testenina, ['quantity' => 100]);

        Recipe::create([
            'name' => 'Čokoladni kolač',
            'description' => 'Sočan i ukusan čokoladni kolač',
            'prep_time' => 45,
            'slika' => 'https://www.bakingclassinchennai.com/blog/wp-content/uploads/2017/12/Chocolate-cake-slice-in-dish-delicious-wallpapers-300x250.jpg',
            'opis' => 'Pomešajte suve sastojke (brašno, kakao, šećer) sa umućenim jajima, mlekom i rastopljenim puterom. Sipajte smesu u pleh i pecite dok kolač ne postane čvrst. Ohladite i pospite šećerom u prahu pre serviranja.',
        ]);
        
        $cake = Recipe::where('name', 'Čokoladni kolač')->first();
        
        $cake->ingredients()->attach($brasno, ['quantity' => 200]);
        $cake->ingredients()->attach($kakao, ['quantity' => 50]);
        $cake->ingredients()->attach($jaja, ['quantity' => 3]);
        $cake->ingredients()->attach($secer, ['quantity' => 150]);


        Recipe::create([
            'name' => 'Cezar salata',
            'description' => 'Klasična Cezar salata sa hrskavim krutonima',
            'prep_time' => 20,
            'slika' => 'https://www.foodsala.com/wp-content/uploads/2024/01/0328-ceasar-salad-lede-scaled.webp',
            'opis' => 'U posudi pomešajte zelenu salatu, seckane krutone i rendani parmezan. Prelijte sa Cezar prelivom (možete napraviti od majoneza, limunovog soka i začina) i dobro promešajte.',
        ]);
        
        $salad = Recipe::where('name', 'Cezar salata')->first();
        
        $salad->ingredients()->attach($zelenaSalata, ['quantity' => 200]);
        $salad->ingredients()->attach($parmezan, ['quantity' => 50]);
        $salad->ingredients()->attach($krutoni, ['quantity' => 100]);
        $salad->ingredients()->attach($pileciFile, ['quantity' => 200]);


        Recipe::create([
            'name' => 'Palacinke',
            'description' => 'Tanke i mekane palačinke za slatki doručak',
            'prep_time' => 30,
            'slika' => 'https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/fluffy-pancakes-52.jpg',
            'opis' => 'Pomešajte brašno, jaja, mleko i malo šećera kako biste dobili glatko testo. Na vrućem tiganju pecite tanke palačinke sa obe strane. Poslužite sa omiljenim prelivima, poput džema ili meda.',
        ]);
        
        $pancakes = Recipe::where('name', 'Palacinke')->first();
        
        $pancakes->ingredients()->attach($brasno, ['quantity' => 200]);
        $pancakes->ingredients()->attach($jaja, ['quantity' => 2]);
        $pancakes->ingredients()->attach($mleko, ['quantity' => 300]);
        $pancakes->ingredients()->attach($secer, ['quantity' => 50]);


        Recipe::create([
            'name' => 'Smoothie od jagode i banane',
            'description' => 'Osvežavajući smoothie za zdrav početak dana',
            'prep_time' => 10,
            'slika' => 'https://nourishplate.com/wp-content/uploads/2021/06/Apple-Banana-Smoothie-Recipe-7.jpg',
            'opis' => 'Sve sastojke (jagode, banane, jogurt) stavite u blender i blendajte dok ne dobijete glatku smesu. Sipajte u čaše i uživajte u osvežavajućem napitku.',
        ]);
        
        $smoothie = Recipe::where('name', 'Smoothie od jagode i banane')->first();
        
        $smoothie->ingredients()->attach($jagode, ['quantity' => 150]);
        $smoothie->ingredients()->attach($banane, ['quantity' => 2]);
        $smoothie->ingredients()->attach($jogurt, ['quantity' => 200]);

        // Recept za Lazanje
        Recipe::create([
            'name' => 'Lazanje',
            'description' => 'Slojevito jelo sa mlevenim mesom, bešamel sosom i sirom',
            'prep_time' => 90,
            'slika' => 'https://d17zv3ray5yxvp.cloudfront.net/variants/Wk4Me1PDhq75KXYfwFvNkqm6/d643816d5f22835bda887419d1c7851c5db89be85ac093be6baace40ae811261',
            'opis' => 'Na dno vatrostalnog jela stavite sloj testenine, zatim sloj mlevenog mesa sa paradajz sosom, pa ponovite dok ne potrošite sastojke. Prelijte bešamel sosom, pospite sirom i pecite u pećnici dok ne dobije zlatnu boju.',
        ]);

        $lasagna = Recipe::where('name', 'Lazanje')->first();

        $lasagna->ingredients()->attach($testeninaZaLazanje, ['quantity' => 500]);
        $lasagna->ingredients()->attach($mlevenoMeso, ['quantity' => 500]);
        $lasagna->ingredients()->attach($crniLuk, ['quantity' => 2]);
        $lasagna->ingredients()->attach($paradajzSos, ['quantity' => 400]);
        $lasagna->ingredients()->attach($brasno, ['quantity' => 50]);
        $lasagna->ingredients()->attach($mleko, ['quantity' => 500]);
        $lasagna->ingredients()->attach($puter, ['quantity' => 50]);
        $lasagna->ingredients()->attach($parmezan, ['quantity' => 100]);
        $lasagna->ingredients()->attach($mocarela, ['quantity' => 200]);

        Recipe::create([
            'name' => 'Musaka',
            'description' => 'Tradicionalna musaka sa krompirom, mlevenim mesom i bešamelom',
            'prep_time' => 75,
            'slika' => 'https://www.cooliranje.com/images/tt/2013/10/t_2898025_musaka_sa_krompirom_i_mlevenim_mesom_admin_cool_v.jpg',
            'opis' => 'Na dnu posude poređajte slojeve krompira, pa mlevenog mesa i paradajz sosa. Prelijte mešavinom jaja i mleka. Kuvajte u rerni dok se ne zapeče i dobije zlatnu boju.',
        ]);
        
        $musaka = Recipe::where('name', 'Musaka')->first();
        
        $musaka->ingredients()->attach($krompir, ['quantity' => 1000]);
        $musaka->ingredients()->attach($mlevenoMeso, ['quantity' => 500]);
        $musaka->ingredients()->attach($crniLuk, ['quantity' => 2]);
        $musaka->ingredients()->attach($paradajzSos, ['quantity' => 300]);
        $musaka->ingredients()->attach($jaja, ['quantity' => 4]);
        $musaka->ingredients()->attach($brasno, ['quantity' => 50]);
        $musaka->ingredients()->attach($mleko, ['quantity' => 500]);
        $musaka->ingredients()->attach($puter, ['quantity' => 50]);



        Recipe::create([
            'name' => 'Đuveč',
            'description' => 'Jelo od povrća sa pirinčem, pečeno u rerni',
            'prep_time' => 60,
            'slika' => 'https://www.recepti.com/img/recipe/32419-djuvec-na-moj-nacin_zoom.jpg',
            'opis' => 'U vatrostalnoj posudi pomešajte pirinač, seckano povrće (papriku, paradajz, tikvice) i crni luk. Prelijte vodom i začinite po ukusu. Pokrijte i kuvajte u rerni dok pirinač ne omekša.',
        ]);
        
        $djuvec = Recipe::where('name', 'Đuveč')->first();
        
        $djuvec->ingredients()->attach($pirinac, ['quantity' => 200]);
        $djuvec->ingredients()->attach($crniLuk, ['quantity' => 2]);
        $djuvec->ingredients()->attach($paprika, ['quantity' => 2]);
        $djuvec->ingredients()->attach($paradajz, ['quantity' => 3]);
        $djuvec->ingredients()->attach($tikvice, ['quantity' => 2]);
        $djuvec->ingredients()->attach($patlidzan, ['quantity' => 1]);
        


        Recipe::create([
            'name' => 'Punjene paprike',
            'description' => 'Paprike punjene mlevenim mesom i pirinčem, kuvane u paradajz sosu',
            'prep_time' => 75,
            'slika' => 'https://glaszabjela.me/wp-content/uploads/2018/11/naslovna.jpg',
            'opis' => 'Paprike napunite smesom od mlevenog mesa, pirinča i začina. Stavite ih u lonac, prelijte paradajz sosom i kuvajte na laganoj vatri dok paprika ne omekša.',
        ]);
        
        $punjenePaprike = Recipe::where('name', 'Punjene paprike')->first();
        $punjenePaprike->ingredients()->attach($paprika, ['quantity' => 6]);
        $punjenePaprike->ingredients()->attach($mlevenoMeso, ['quantity' => 400]);
        $punjenePaprike->ingredients()->attach($pirinac, ['quantity' => 100]);
        $punjenePaprike->ingredients()->attach($crniLuk, ['quantity' => 1]);
        $punjenePaprike->ingredients()->attach($paradajzSos, ['quantity' => 500]);
        $punjenePaprike->ingredients()->attach($jaja, ['quantity' => 1]);

        Recipe::create([
            'name' => 'Pasta',
            'description' => 'Slojevito jelo sa makaranama, mlevenim mesom i bešamel sosom',
            'prep_time' => 90,
            'slika' => 'https://saratogaoliveoil.com/cdn/shop/articles/puttanesca-2.jpg?v=1681323391',
            'opis' => 'Povrće i meso propržite na ulju, a zatim dodajte paradajz sos. Kada se sos zagreje, dodajte kuvanu testeninu i dobro promešajte. Poslužite toplo sa parmezanom.',
        ]);
        
        $pasta = Recipe::where('name', 'Pasta')->first();
        $pasta->ingredients()->attach($testenina, ['quantity' => 500]); 
        $pasta->ingredients()->attach($mlevenoMeso, ['quantity' => 500]);
        $pasta->ingredients()->attach($crniLuk, ['quantity' => 2]);
        $pasta->ingredients()->attach($paradajzSos, ['quantity' => 400]);
        $pasta->ingredients()->attach($brasno, ['quantity' => 50]);
        $pasta->ingredients()->attach($mleko, ['quantity' => 500]);
        $pasta->ingredients()->attach($puter, ['quantity' => 50]);
        $pasta->ingredients()->attach($parmezan, ['quantity' => 100]);

        Recipe::create([
            'name' => 'Kačamak',
            'description' => 'Gusto jelo od kukuruznog brašna, idealno za hladnije dane',
            'prep_time' => 30,
            'slika' => 'https://media.ilovezrenjanin.com/2021/02/hajducki-kacamak1.jpg',
            'opis' => 'Prokuvajte vodu, a zatim dodajte kukuruzno brašno postepeno mešajući. Kuvajte dok se ne zgusne, a zatim posolite i dodajte puter po želji.',
        ]);
        
        $kacamak = Recipe::where('name', 'Kačamak')->first();

        $kacamak->ingredients()->attach($kukuruznoBrasno, ['quantity' => 300]); 
        $kacamak->ingredients()->attach($voda, ['quantity' => 600]);
        $kacamak->ingredients()->attach($so, ['quantity' => 10]); 
        */
    }
        
}
