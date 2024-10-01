<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    use ApplicationResponse;

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return $this->json(
                Response::HTTP_NOT_ACCEPTABLE,
                $validator->errors()
            );
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return $this->json(
            Response::HTTP_NOT_ACCEPTABLE,
            'Success',
            $user
        );
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return $this->json(
            Response::HTTP_NOT_ACCEPTABLE,
            'Success',
            $user
        );
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'role' => 'sometimes|in:admin,user',
        ]);

        if ($validator->fails()) {
            return $this->json(
                Response::HTTP_NOT_ACCEPTABLE,
                $validator->errors()
            );
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->has('role')) {
            $user->role = $request->role;
        }

        $user->save();

        return $this->json(
            Response::HTTP_NOT_ACCEPTABLE,
            'Success',
            $user
        );
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                'User not found',
            );
        }

        $user->delete();

        return $this->json(
            Response::HTTP_OK,
            'Success.',
        );
    }
}
