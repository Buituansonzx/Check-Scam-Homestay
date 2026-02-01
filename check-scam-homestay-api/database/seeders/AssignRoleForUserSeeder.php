<?php

namespace Database\Seeders;

use App\Containers\AppSection\User\Models\User;
use Illuminate\Database\Seeder;

class AssignRoleForUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $adminEmails = [
            'hatmamxanh.hmx@gmail.com',
            'bson55444@gmail.com'
        ];
        $adminRoleName = 'admin';
        foreach ( $adminEmails as $email ) {
            $userModel = User::where('email', $email)->first();
            if ($userModel) {
                $userModel->assignRole($adminRoleName);
                $this->command->info("Assigned role '{$adminRoleName}' to user: " . $email);
            } else {
                $this->command->info("User with email '{$email}' not found.");
            }
        }

        $userEmails = [
            'vuongtuan@gmail.com'
        ];
        $userRoleName = 'user';
        foreach ( $userEmails as $email ) {
            $userModel = User::where('email', $email)->first();
            if ($userModel) {
                $userModel->assignRole($userRoleName);
                $this->command->info("Assigned role '{$userRoleName}' to user: " . $email);
            } else {
                $this->command->info("User with email '{$email}' not found.");
            }
        }
    }
}
