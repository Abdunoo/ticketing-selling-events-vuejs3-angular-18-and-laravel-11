<?php

namespace Database\Factories;

use App\Models\TicketType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TicketType>
 */
class TicketTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = TicketType::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Regular', 'VIP']),
            'price' => $this->faker->numberBetween(5000, 100000),
            'available_quantity' => $this->faker->numberBetween(10, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Define a VIP ticket type state.
     *
     * @return static
     */
    public function vip(): static
    {
        return $this->state([
            'name' => 'VIP',
            'price' => $this->faker->numberBetween(100000, 200000),
        ]);
    }

    /**
     * Define a regular ticket type state.
     *
     * @return static
     */
    public function regular(): static
    {
        return $this->state([
            'name' => 'Regular',
            'price' => $this->faker->numberBetween(5000, 50000),
        ]);
    }
}
