<?php

namespace App\Policies;

use App\Models\Artist;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArtistPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, Artist $artist): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Artist $artist): bool
    {
    }

    public function delete(User $user, Artist $artist): bool
    {
    }

    public function restore(User $user, Artist $artist): bool
    {
    }

    public function forceDelete(User $user, Artist $artist): bool
    {
    }
}
