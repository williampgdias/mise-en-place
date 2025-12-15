<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 tables of 2 people
        for ($i = 1; $i <= 5; $i++) {
            Table::create([
                'name' => 'Table 2.' . $i,
                'capacity' => 2,
                'location' => 'front'
            ]);
        }

        // Create 3 tables of 4 people
        for ($i = 1; $i <= 3; $i++) {
            Table::create([
                'name' => 'Table 4.' . $i,
                'capacity' => 4,
                'location' => 'front'
            ]);
        }

        // Create a one big table (Family)
        Table::create([
            'name' => 'Family Table',
            'capacity' => 8,
            'location' => 'terrace'
        ]);
    }
}