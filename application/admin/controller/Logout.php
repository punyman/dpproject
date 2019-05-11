<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/11
 * Time: 10:06
 */
namespace app\admin\controller;

use think\Controller;
use think\Session;
use think\Url;

class Logout extends Controller
{
    public function index()
    {
        Session::delete(['uid', 'username']);
        $this->success('退出成功',url('login/index'));
    }
}