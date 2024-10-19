<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\OtpMail;
use Google\Service\Storagetransfer\GoogleServiceAccount;
use Google_Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    use ApplicationResponse;

    public function me(Request $request)
    {
        // Return the currently authenticated user
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $request->user
        );
    }

    public function me_update(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255,' . Auth::id(),
            'profession' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'picture' => 'nullable|url', // Assuming picture is stored as URL
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user
        $user = User::find($request->user->id);

        // Update the user's profile with the validated data
        $user->name = $request->input('first_name') . ' ' . $request->input('last_name');
        // $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        // $user->profession = $request->input('profession');
        // $user->bio = $request->input('bio');
        // $user->picture = $request->input('picture');

        // Save the updated user
        $user->save();

        // Return the updated user data as JSON
        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $user,
        ], 200);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|unique:users|max:255',
                'password' => 'required|string|min:8',
            ]);
    
            $otp = rand(100000, 999999);
            
            // Store user details and OTP in cache for 5 minutes
            $userData = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'otp' => $otp
            ];
    
            Cache::put('user_data_' . $request->email, $userData, now()->addMinutes(5));
    
            // Send OTP to user's email
            Mail::to($request->email)->send(new OtpMail($otp));
    
            return $this->json(
                Response::HTTP_OK,
                "Registration successful. Please verify your email."
            );
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required',
            'email' => 'required|email',
        ]);
    
        // Retrieve the stored user data from cache
        $userData = Cache::get('user_data_' . $request->email);
    
        if ($userData && $userData['otp'] == $request->otp) {
            // Create user in the database
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => $userData['password'],
                'email_verified_at' => now() // Optional: mark the user as verified
            ]);
    
            // Clear the cached data
            Cache::forget('user_data_' . $request->email);
    
            return $this->json(
                Response::HTTP_OK,
                "Email verification successful. Account created."
            );
        }
    
        return $this->json(
            Response::HTTP_BAD_REQUEST,
            "Invalid OTP."
        );
    }
    
    public function login(Request $request)
    {
        // Validate the request inputs
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Retrieve credentials from the request
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // Get the authenticated user
            $user = Auth::user();

            // Generate a token for the authenticated user
            $token = $user->createToken('authToken')->plainTextToken;

            // Prepare the data to be returned
            $data = [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ];

            // Return success response with user and token data
            return $this->json(
                Response::HTTP_OK,
                "OTP sent to your email.",
                $data
            );
        }

        // If authentication fails, return an unauthorized response
        return response()->json([
            'status' => Response::HTTP_UNAUTHORIZED,
            'message' => 'Invalid credentials.'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                "User not found."
            );
        }

        $otp = rand(100000, 999999);
        // Store OTP in session or cache with expiration
        session(['otp' => $otp]);
        session(['email' => $request->email]);

        Mail::to($request->email)->send(new OtpMail($otp));

        return $this->json(
            Response::HTTP_OK,
            "OTP sent to your email."
        );
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $storedOtp = session('otp');
        $email = session('email');

        if ($storedOtp === $request->otp) {
            $user = User::where('email', $email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            session()->forget(['otp', 'email']);
            return $this->json(
                Response::HTTP_OK,
                "Password reset successful."
            );
        }

        return $this->json(
            Response::HTTP_BAD_REQUEST,
            "Invalid OTP."
        );
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return $this->json(
                Response::HTTP_BAD_REQUEST,
                "Incorrect current password."
            );
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return $this->json(
            Response::HTTP_OK,
            "Password changed successfully."
        );
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return $this->json(
            Response::HTTP_OK,
            "Logged out successfully."
        );
    }

    public function index(Request $request)
    {

        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            DB::commit();
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'User created successfully.',
                'data' => $user,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'User not found',
            ]);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Success.',
            'data' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'User not found',
            ]);
        }

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'User updated successfully.',
            'data' => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => 'User not found',
            ]);
        }

        $user->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'User deleted successfully.',
            'data' => $user,
        ]);
    }

    public function handleGoogleCallback(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            return response()->json(['error' => 'Authorization code is missing'], 400);
        }

        try {
            // Step 1: Exchange authorization code for access token
            $response = Http::post('https://oauth2.googleapis.com/token', [
                'code' => $code,
                'client_id' => env('GOOGLE_CLIENT_ID'),
                'client_secret' => env('GOOGLE_CLIENT_SECRET'),
                'redirect_uri' => 'postmessage', // or your actual redirect URL
                'grant_type' => 'authorization_code'
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'Failed to exchange token'], 500);
            }

            $accessToken = $response->json()['access_token'];

            // Step 2: Fetch user details using the access token
            $userResponse = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
            ])->get('https://www.googleapis.com/oauth2/v3/userinfo');

            if ($userResponse->failed()) {
                return response()->json(['error' => 'Failed to fetch user details'], 500);
            }

            $userData = $userResponse->json();

            $userExist=User::where('name', '=', $userData['name'])->first();

            $user = User::createOrFirst([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'avatar' => $userData['picture']
            ]);

            $token = $user->createToken('authToken')->plainTextToken;

            // Prepare the data to be returned
            $data = [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ];

            // Return success response with user and token data
            return $this->json(
                Response::HTTP_OK,
                "OTP sent to your email.",
                $data
            );

        } catch (\Exception $e) {
            return response()->json([
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
