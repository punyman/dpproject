<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/14
 * Time: 9:51
 */
namespace app\common\controller;

use think\Controller;

class AdminBase extends Controller
{
    public function _initialize()
    {
        $controller = \request()->controller();
        $action = request()->action();
        $this->assign('current_controller', strtolower($controller));
        $this->assign('current_action', strtolower($action));
    }
}