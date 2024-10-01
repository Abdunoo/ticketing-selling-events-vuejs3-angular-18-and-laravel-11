<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'id' => 1,
            'name' => 'Manunggal Fair Kulon Progo 2024',
            'slug' => 'manunggal-fair-kulon-progo-2024',
            'description' => 'Manunggal Fair 2024 adalah sebuah pameran tahunan yang diselenggarakan oleh Pemerintah Kabupaten Kulon Progo untuk memperingati Hari Jadi ke-73 Kabupaten Kulon Progo pada tahun 2024. Pameran ini akan berlangsung dari 27 September hingga 5 Oktober 2024 di Taman Budaya Kulon Progo. Tema Manunggal Fair 2024 adalah "Tembayatan Bebarengan mBangun Kulon Progo, Gugur Gunung Tandang Gawe". Tema ini mengajak seluruh stakeholder di Kabupaten Kulon Progo untuk bekerja sama dalam pembangunan Kabupaten Kulon Progo, tanpa membedakan status dan golongan. Tagline Manunggal Fair 2024 adalah "Gayeng", yang merupakan akronim dari "Gawe Ayem lan Regeng".',
            'location' => 'Taman Budaya Kulon Progo',
            'start_datetime' => '2024-09-22 00:07:00',
            'end_datetime' => '2024-10-22 00:07:00',
            'image_banner' => '/storage/images/20240921171056_product.webp',
            'is_active' => 1,
            'organizer_id' => 2,
        ]);
    }
}
