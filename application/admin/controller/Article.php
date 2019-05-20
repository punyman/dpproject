<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/15
 * Time: 14:31
 */
namespace app\admin\controller;

use app\common\controller\Admin;
use think\Db;
use think\Request;

class Article extends Admin
{
    public function category()
    {
        $model = new \app\admin\model\Article();
        $list = $model->get_all_category();
        return view('', ['list' => $list]);
    }
    public function category_add()
    {
        if (Request::instance()->isPost()) {
            $data = input('post.');
            $thumb = '';
            if (!empty($_FILES['thumb']['name'])) {
                $file = request()->file('thumb');
                $info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                $thumb = '/uploads/'.$info->getSaveName();
            }
            $updata = ['title' => trim($data['title']), 'displayorder' => intval($data['displayorder']), 'status' => intval($data['status']), 'thumb' => $thumb, 'pid' => intval($data['pid'])];
            $id = Db::name('article_category')->insertGetId($updata);
            plog('article/category', '添加分类 ID : ' . $id);
            $this->success('添加成功',url('article/category'));
        } else {
            $parent_id = Request::instance()->param('parent_id');
            return view('',['parent_id' => $parent_id]);
        }
    }
    public function category_edit($id)
    {
        if (Request::instance()->isPost()) {
            $data = input('post.');
            $updata = ['title' => trim($data['title']), 'displayorder' => intval($data['displayorder']), 'status' => intval($data['status']), 'pid' => intval($data['pid'])];
            if (!empty($_FILES['thumb']['name'])) {
                $file = request()->file('thumb');
                $info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                $thumb = '/uploads/'.$info->getSaveName();
                $updata['thumb'] = $thumb;
            }
            Db::name('article_category')->where(['id' => $id])->update($updata);
            plog('category_edit', '修改分类 ID ' . $id);
            $this->success('修改成功', url('article/category'));
        } else {
            $item = Db::name('article_category')->where(['id' => $id])->find();
            return view('', ['item' => $item]);
        }
    }
    public function category_delete($id)
    {
        if ($id) {
            $item = Db::name('article_category')->where(['id' => $id])->find();
            if (empty($item)) {
                $this->error('分类不存在或已删除', url('article/category'));
            }
            Db::name('article_category')->where(['id' => $id])->whereOr(['pid' => $id])->delete();
            plog('category_delete', '删除分类 ID ' . $id . ' 名称 ' . $item['title']);
            $this->success('成功删除');
        } else {
            $this->error('参数错误', url('article/category'));
        }
    }
}