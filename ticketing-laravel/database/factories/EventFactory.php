<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Event::class;

    public function definition(): array
    {
        $categories = [
            'Music',
            'Food',
            'Tech',
            'Art',
            'Sports',
            'Health',
            'Education',
            'Entertainment',
            'Travel',
            'Lifestyle',
            'Charity',
        ];

        return [
            'name' => $this->faker->unique()->sentence(3),
            'slug' => Str::slug($this->faker->unique()->sentence(3)),
            'description' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement($categories), // Random category selection
            'start_datetime' => $this->faker->dateTimeBetween('+1 days', '+2 months'),
            'end_datetime' => $this->faker->dateTimeBetween('+2 months', '+3 months'),
            'location' => $this->faker->address(),
            'image_banner' => $this->faker->imageUrl(640, 480, 'event', true),
            'organizer_id' => 1, // Assuming an existing organizer
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
