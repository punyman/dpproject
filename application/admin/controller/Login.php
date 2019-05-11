<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/8
 * Time: 16:51
 */
namespace app\admin\controller;

use app\admin\model\Users;

use think\Controller;

use think\Request;

class Login extends Controller
{
    public function index()
    {
        if (Request::instance()->isPost()) {
            $username = input('post.username');
            $password = input('post.password');
            $model = new Users();
            $user = $model->check($username, $password);
            if (!$user) {
                $this->error('用户名密码错误!');
            } else {
                $model->setLogin($user);
                plog('login/index', '用户登录系统');
                $this->success('登录成功、前往管理后台','Index/index');
            }
        } else {
            return view();
        }
    }
}