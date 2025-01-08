<?php

namespace App\Faker;

use Faker\Provider\Base;

class PokemonFaker extends Base
{
    /**
     * Fakes a string based on one of the Pokémon of the first generation
     * @param string $language currently supports 'en' and 'de'
     * @return string
     */
    public function pokemon(string $language = 'de'): string
    {
        if ($language !== 'de')
        {
            return static::randomElement([
                "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"
            ]);
        }
        else
        {
            return static::randomElement([
                "Bisasam","Bisaknosp","Bisaflor","Glumanda","Glutexo","Glurak","Schiggy","Schillok","Turtok","Raupy","Safcon","Smettbo","Hornliu","Kokuna","Bibor","Taubsi","Tauboga","Tauboss","Rattfratz","Rattikarl","Habitak","Ibitak","Rettan","Arbok","Pikachu","Raichu","Sandan","Sandamer","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Piepi","Pixi","Vulpix","Vulnona","Pummeluff","Knuddeluff","Zubat","Golbat","Myrapla","Duflor","Giflor","Paras","Parasek","Bluzuk","Omot","Digda","Digdri","Mauzi","Snobilikat","Enton","Entoron","Menki","Rasaff","Fukano","Arkani","Quapsel","Quaputzi","Quappo","Abra","Kadabra","Simsala","Machollo","Maschock","Machomei","Knofensa","Ultrigaria","Sarzenia","Tentacha","Tentoxa","Kleinstein","Georok","Geowaz","Ponita","Gallopa","Flegmon","Lahmus","Magnetilo","Magneton","Porenta","Dodu","Dodri","Jurob","Jugong","Sleima","Sleimok","Muschas","Austos","Nebulak","Alpollo","Gengar","Onix","Traumato","Hypno","Krabby","Kingler","Voltobal","Lektrobal","Owei","Kokowei","Tragosso","Knogga","Kicklee","Nockchan","Schlurp","Smogon","Smogmog","Rihorn","Rizeros","Chaneira","Tangela","Kangama","Seeper","Seemon","Goldini","Golking","Sterndu","Starmie","Pantimos","Sichlor","Rossana","Elektek","Magmar","Pinsir","Tauros","Karpador","Garados","Lapras","Ditto","Evoli","Aquana","Blitza","Flamara","Porygon","Amonitas","Amoroso","Kabuto","Kabutops","Aerodactyl","Relaxo","Arktos","Zapdos","Lavados","Dratini","Dragonir","Dragoran","Mewtu","Mew"
            ]);
        }
    }
}
