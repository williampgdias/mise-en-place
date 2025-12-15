<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        // Tables 1, 2, 3, 4, 5
        for ($i = 1; $i <= 5; $i++) {
            Table::create([
                'name' => 'Table ' . $i, // Ex: "Table 1"
                'capacity' => 2,
                'location' => 'front'
            ]);
        }

        // Tables 10, 11, 12, 13, 14
        for ($i = 0; $i < 5; $i++) {
            Table::create([
                'name' => 'Table ' . (10 + $i), // Ex: "Table 10"
                'capacity' => 4,
                'location' => 'inside'
            ]);
        }

        // Table 20
        Table::create([
            'name' => 'Table 20 (VIP)',
            'capacity' => 6,
            'location' => 'terrace'
        ]);

        // Table 99
        Table::create([
            'name' => 'Table 99',
            'capacity' => 8,
            'location' => 'inside'
        ]);
    }
}