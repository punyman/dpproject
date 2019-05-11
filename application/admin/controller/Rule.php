<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/9
 * Time: 15:41
 */
namespace app\admin\controller;

use app\admin\model\AuthRule;
use app\common\controller\Admin;
use think\auth\Auth;
use think\Db;
use think\Request;

class Rule extends Admin
{
    public function index()
    {
        $model = new AuthRule();
        $tree = $model->getTree('tree', 'id', 'title');
        return view('', ['tree' => $tree]);
    }
    public function edit()
    {
        $ruleid = input('post.ruleid');
        if (!$ruleid) {
            $this->error('参数错误');
        }
        $data = [
            'name' => input('post.name'),
            'title' => input('post.title'),
            'pid' => input('post.pid')
        ];
        AuthRule::update($data, ['id' => $ruleid]);
        plog('rule/edit', '编辑权限 : ' . $ruleid);
        $this->success('操作成功');
    }
    public function add()
    {
        $data = [
            'name' => input('post.name'),
            'title' => input('post.title'),
            'pid' => input('post.pid')
        ];
        AuthRule::create($data);
        plog('rule/add', '添加权限 : ' . $data['title'] . ' 路由 : ' . $data['name']);
        $this->success('操作成功');
    }
    public function delete($id)
    {
        if ($id) {
            AuthRule::destroy(['id' => $id]);
            plog('rule/delete', '删除权限 : ' . $id);
            $this->success('操作成功');
        } else {
            $this->error('参数错误');
        }
    }
    public function group()
    {
        $list = Db::name('auth_group')->select();
        return view('', ['list' => $list]);
    }
    public function group_add()
    {
        Db::name('auth_group')->insert(['title' => input('post.title')]);
        plog('rule/group_add','添加角色 : ' . input('post.title'));
        $this->success('操作成功');
    }
    public function group_edit()
    {
        $id = input('post.id');
        if (!$id) {
            $this->error('参数错误');
        }
        Db::name('auth_group')->where(['id' => $id])->update(['title' => input('post.title')]);
        plog('rule/group_edit', '修改角色 : ' . $id);
        $this->success('操作成功');
    }
    public function group_delete($id)
    {
        if ($id) {
            Db::name('auth_group')->delete(['id' => $id]);
            plog('rule/group_delete', '删除角色 : ' . $id);
            $this->success('操作成功');
        } else {
            $this->error('参数错误');
        }
    }
    public function group_authorize($id)
    {
        if (Request::instance()->isPost()) {
            $rules = input('post.rules/a');
            Db::name('auth_group')->where(['id' => $id])->update(['rules' => implode(',', $rules)]);
            plog('rule/group_authorize', '编辑角色权限 : ' . $id);
            $this->success('权限编辑成功');
        } else {
            $group = Db::name('auth_group')->where(['id' => $id])->find();
            $group['rules'] = explode(',',$group['rules']);
            $rulemodel = new AuthRule();
            $rules = $rulemodel->getTree('level','id','title');
            return view('', ['rules' => $rules, 'group' => $group]);
        }
    }
    public function users()
    {
        $users = Db::name('users')->paginate(10);
        $page = $users->render();
        $users = $users->all();
        foreach ($users as &$val) {
            if ($val['status'] == 0) {
                $val['status_str'] = '禁用';
                $val['status_css'] = 'label-danger';
            } else {
                $val['status_str'] = '正常';
                $val['status_css'] = 'label-success';
            }
            $groups = Db::name('auth_group')->alias('g')->field('g.title')->join('__AUTH_GROUP_ACCESS__ a', 'g.id=a.group_id')->select();
            foreach ($groups as $v) {
                $g[] = $v['title'];
            }
            $val['groups'] = implode('、', $g);
        }
        unset($val);
        return view('', ['users' => $users]);
    }
}