<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateRequest;
use App\Http\Requests\Task\UpdateRequest;
use App\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    const PENDING = 'pending';
    const RUNNING = 'running';
    const COMPLETE = 'complete';

    public function index()
    {
        if ($user = Auth::user()) {
            $tasks = $user->tasks;

            $tasks = $tasks->each(function ($task) {
                $startAt = Carbon::createFromFormat('Y-m-d H:i:s', $task->start_at);
                $task['end_at'] = $startAt->addSeconds($task->duration)->format('Y-m-d H:i:s');
            });

            return response()->json([
                'data' => [
                    'tasks' => $tasks,
                ],
            ], Response::HTTP_OK);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function store(CreateRequest $request)
    {
        if ($user = Auth::user()) {
            if (Task::create([
                'user_id'  => $user->id,
                'tags'     => json_encode($request->input('tags')),
                'duration' => $request->input('duration'),
                'like'     => json_encode($request->input('like')),
                'follow'   => json_encode($request->input('follow')),
                'status'   => self::PENDING,
                'start_at' => $request->input('start_at'),
            ])) {
                return response()->json('', Response::HTTP_CREATED);
            }

            return response()->json('', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function show(Task $task)
    {
        return response()->json([
            'data' => [
                'task' => $task,
            ],
        ], Response::HTTP_OK);
    }

    public function update(UpdateRequest $request, Task $task)
    {
        if ($user = Auth::user()) {
            $task->user_id = $user->id;
            $task->tags = json_encode($request->input('tags'));
            $task->duration = $request->input('duration');
            $task->like = json_encode($request->input('like'));
            $task->follow = json_encode($request->input('follow'));
            $task->status = self::PENDING;
            $task->start_at = $request->input('start_at');

            if ($task->save()) {
                return response()->json('', Response::HTTP_OK);
            }

            return response()->json('', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function destroy(Task $task)
    {
        if ($task->delete()) {
            return response()->json('', Response::HTTP_OK);
        }

        return response()->json('', Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
