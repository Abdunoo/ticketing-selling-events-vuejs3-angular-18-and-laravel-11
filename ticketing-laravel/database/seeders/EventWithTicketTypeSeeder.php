<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventWithTicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 100 events
        Event::factory(100)->create()->each(function ($event) {
            // Create 2 ticket types for each event
            TicketType::factory()->count(2)->create([
                'event_id' => $event->id,
            ]);
        });
    }
}
