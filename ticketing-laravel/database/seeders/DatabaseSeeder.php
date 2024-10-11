<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Pastikan Anda menggunakan Hash::make untuk mengenkripsi password
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'User Biasa',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);

        $this->call([
            // EventSeeder::class,
            // TicketTypeSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
