<?php

namespace App\Console\Commands;

use App\Task;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class StartTasks extends Command
{
    const URL = 'http://192.168.0.165:3000/automationBasedOnTags';
    //X-Service-Auth
    const TOKEN = '123456';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run Instagram tasks';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $tasks = Task::where([
            ['status', 'pending'],
            ['start_at', '<=', Carbon::now()->addHour()->format('Y-m-d H:i')],
        ])->get();

        $tasks->each(function ($task) {
            $user = User::find($task->user_id);
            $profile = $user->instagramProfile;

            $tags = json_decode($task->tags, true);
            $like = json_decode($task->like, true);
            $follow = json_decode($task->follow, true);
            $duration = $task->duration;

            $params = json_encode([
                'tags'     => $tags,
                'duration' => $duration,
                'user'     => [
                    'login'    => $profile->username,
                    'password' => $profile->password,
                ],
                'like'     => $like,
                'follow'   => $follow,
            ]);

            $ch = curl_init(self::URL);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type:application/json',
                'X-Service-Auth:'.self::TOKEN,
            ));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);

            $task->status = 'complete';
            $task->save();
        });
    }
}
