<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/8
 * Time: 16:38
 */
namespace app\common\controller;

use think\auth\Auth;
use think\Controller;
use think\Session;

class Admin extends Controller
{
    public function _initialize()
    {
        parent::_initialize();
        $uid = Session::get('uid');
        if (!$uid) {
            $this->error('请登录系统', url('login/index'));
        }
        $auth = new Auth();
        $controller = request()->controller();
        $action = request()->action();
        if (!$auth->check($controller . '/' . $action, $uid)) {
            $this->error('您没有权限访问');
        }
        $this->assign('current_controller', strtolower($controller));
    }
}