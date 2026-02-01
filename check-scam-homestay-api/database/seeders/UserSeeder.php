<?php

namespace Database\Seeders;

use App\Containers\AppSection\User\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Bui Tuan Son',
                'email' => 'bson55444@gmail.com',
                'password' => bcrypt('123456'),
                'gender' => 'male',
                'birth' => '2002-03-09',
            ],
            [
                'name' => 'Admin Tuan Son',
                'email' => 'hatmamxanh.hmx@gmail.com',
                'password' => bcrypt('123456'),
                'gender' => 'male',
                'birth' => '2002-03-09',
            ],
            [
                'name' => 'Vuong Tuan',
                'email' => 'vuongtuan@gamil.com',
                'password' => bcrypt('123456'),
                'gender' => 'male',
                'birth' => '2000-05-15',
            ]
        ];

        foreach ( $users as $userData ) {
            $userModel = User::where('email', $userData['email'])->first();
            if (!$userModel) {
                User::create($userData);
                 $this->command->info("Created user: " . $userData['email']);
            }
        }

    }
}
