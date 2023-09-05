<?php

namespace Database\Seeders;
use App\Models\Travel;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Travel::create([
            'name' => 'Angkor Wat',
            'location' => 'Camboya',
            'image' => 'images/angkorwat.jpg',
            'description' => 'Templo hinduista más grande y también el mejor conservado de los que integran el asentamiento de Angkor, Está considerado como la mayor estructura religiosa jamás construida, y uno de los tesoros arqueológicos más importantes del mundo.',
        ]);
        Travel::create([
            'name' => 'Terrazas de arroz Jatiluwih',
            'location' => 'Indonesia',
            'image' => 'images/bali.jpg',
            'description' => 'Las Terrazas de Arroz de Jatiluwih son un conjunto de campos de arroz que se extienden por las laderas de las montañas en Bali, Indonesia. Estas terrazas son una verdadera maravilla de la ingeniería y la belleza natural.',
        ]);
        Travel::create([
            'name' => 'Bangkok',
            'location' => 'Tailandia',
            'image' => 'images/bangkok.jpg',
            'description' => 'Bangkok, la capital de Tailandia, es una extensa ciudad conocida por los santuarios ornamentados y la animada vida callejera.',
        ]);
        Travel::create([
            'name' => 'Big Buddha',
            'location' => 'Tailandia',
            'image' => 'images/chiangrai.jpg',
            'description' => 'Se encuentra en Chiang Rai, al norte de Tailandia. Aquí veremos la escultura de 86 metros de altura de Guan Yin, la Diosa de la Misericordia, se la conoce también como Lady Buddha o Big Buddha.',
        ]);
        Travel::create([
            'name' => 'Puente del Dragón',
            'location' => 'Vietnam',
            'image' => 'images/danang.jpg',
            'description' => 'Es un puente figurativo sobre el río Han en Da Nang, Vietnam. La construcción del Puente comenzó en julio de 2009 y se abrió al tráfico en marzo del 2013',
        ]);
        Travel::create([
            'name' => 'Bahía de Ha Long',
            'location' => 'Vietnam',
            'image' => 'images/halongbay.jpg',
            'description' => 'Es una extensión de agua de aproximadamente 1500 km². Situada al norte de Vietnam. Destaca la presencia de elementos kársticos e islas de varios tamaños y formas.',
        ]);
        Travel::create([
            'name' => 'Isla Ko Kut',
            'location' => 'Tailandia',
            'image' => 'images/kokut.jpg',
            'description' => 'Ko Kut es una isla y distrito de la provincia de Trat, en Tailandia oriental. Con una población de alrededor de 2.118 personas en 2007, es el distrito con menor población de toda Tailandia.',
        ]);
        Travel::create([
            'name' => 'Valle de Uco, Mendoza',
            'location' => 'Argentina',
            'image' => 'images/mendoza.jpg',
            'description' => 'El Valle de Uco es una importante región vitivinícola, considerada como una de las mejores en toda la Argentina. Luego de la instalación de numerosas bodegas en la región, el turismo se ha desarrollado cada vez con más fuerza.',
        ]);
        Travel::create([
            'name' => 'Talampaya',
            'location' => 'Argentina',
            'image' => 'images/talampaya-larioja.jpg',
            'description' => 'El Parque Nacional Talampaya se encuentra ubicado en la provincia de La Rioja en Argentina. Fue creado con el objetivo de proteger importantes yacimientos arqueológicos y paleontológicos de la zona. Es Patrimonio de la Humanidad.',

        ]);
        Travel::create([
            'name' => 'Hanoi',
            'location' => 'Vietnam',
            'image' => 'images/Temple-of-literature-hanoi.jpg',
            'description' => 'Hanói es la capital de Vietnam, así como la segunda ciudad más grande del país tras la ciudad de Ho Chi Minh. Se encuentra en la zona norte del país.',
        ]);
    }
}

// php artisan db:seed --class=DestinationsTableSeeder