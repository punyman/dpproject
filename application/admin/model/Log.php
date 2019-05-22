<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/15
 * Time: 10:16
 */
namespace app\admin\model;

use think\Model;

class Log extends Model
{
    static public $action = [
        'login/index' => '登录',
        'rule/edit' => '编辑权限',
        'rule/add' => '添加权限',
        'rule/delete' => '删除权限',
        'rule/group_add' => '添加角色',
        'rule/group_edit' => '编辑角色',
        'rule/group_delete' => '删除角色',
        'rule/group_authorize' => '分配权限',
        'rule/user_add' => '添加用户',
        'rule/user_edit' => '编辑用户',
        'article/category_add' => '添加分类',
        'article/category_edit' => '编辑分类',
        'article/category_delete' => '删除分类',
        'article/content_add' => '添加文章',
        'article/content_edit' => '编辑文章'
    ];
}