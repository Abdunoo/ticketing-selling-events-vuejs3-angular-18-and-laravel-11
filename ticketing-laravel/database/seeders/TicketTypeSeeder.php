<?php

namespace Database\Seeders;

use App\Models\TicketType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketType::create([
            'event_id' => 1,
            'name' => 'Reguler',
            'price' => '5000.00',
            'available_quantity' => 99999,
        ]);
    }
}
