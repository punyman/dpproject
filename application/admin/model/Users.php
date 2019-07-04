<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/9
 * Time: 14:43
 */
namespace app\admin\model;

use think\Db;
use think\Model;
use think\Session;

class Users extends Model
{
    protected function initialize()
    {
        parent::initialize();
    }
    public function check($username, $password)
    {
        $user = Db::name('users')->where(['username' => $username])->find();
        if (empty($user)) {
            return error(-1, '无此账号');
        } else {
            if (!$user['status']) {
                return error(-1 ,'此账户暂时无法登陆');
            }
            if (userpassword($password, $user['salt']) == $user['password']) {
                return $user;
            } else {
                return error(-1, '用户名密码错误');
            }
        }
    }
    public function setLogin($user = array())
    {
        Session::set('uid', $user['id']);
        Session::set('username', $user['username']);
        return true;
    }
}