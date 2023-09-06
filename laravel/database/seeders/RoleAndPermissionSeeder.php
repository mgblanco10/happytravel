<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    
    public function run(): void
    {
        Permission::create(['name' => 'create-users']);
        Permission::create(['name' => 'edit-users']);
        Permission::create(['name' => 'delete-users']);

        Permission::create(['name' => 'create-travels']);
        Permission::create(['name' => 'edit-travels']);
        Permission::create(['name' => 'delete-travels']);
        Permission::create(['name' => 'like-travels']);

        $superAdminRole = Role::create(['name' => 'SuperAdmin']);
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);

        $superAdminRole->givePermissionTo([
            'create-users',
            'edit-users',
            'delete-users',
            'create-travels',
            'edit-travels',
            'delete-travels',
        ]);

        $adminRole->givePermissionTo([
            'create-travels',
            'edit-travels',
            'delete-travels',
        ]);

        $userRole->givePermissionTo([
            'create-travels',
            'edit-travels',
            'delete-travels',
            'like-travels',
        ]);
    }
}
