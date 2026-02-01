<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $roles = [
            ['name' => 'admin'],
            ['name' => 'user'],
        ];
        foreach ($roles as $role) {
            if(Role::where('name', $role['name'])->exists()){
                continue;
            }
            Role::create($role);
        }
    }
}
