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
            // Create a regular ticket type for each event
            TicketType::factory()->regular()->create([
                'event_id' => $event->id,
            ]);

            // Create a VIP ticket type for each event
            TicketType::factory()->vip()->create([
                'event_id' => $event->id,
            ]);
        });
    }
}
