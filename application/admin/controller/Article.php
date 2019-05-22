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
            plog('article/category_add', '添加分类 ID : ' . $id);
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
            plog('article/category_edit', '修改分类 ID ' . $id);
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
            plog('article/category_delete', '删除分类 ID ' . $id . ' 名称 ' . $item['title']);
            $this->success('成功删除');
        } else {
            $this->error('参数错误', url('article/category'));
        }
    }
    public function contents()
    {
        $category = Db::name('article_category')->where('status=1')->field('id,title')->order('displayorder desc')->select();
        $where = [];
        $data = request()->param();
        if (isset($data['cate']) && $data['cate'] != '') {
            $where['cate'] = intval($data['cate']);
        }
        if (isset($data['is_recommend']) && $data['is_recommend'] != '') {
            $where['is_recommend'] = $data['is_recommend'] == 'yes' ? 1 : 0;
        }
        if (isset($data['status']) && $data['status'] != '') {
            $where['status'] = $data['status'] == 'yes' ? 1 : 0;
        }
        if (isset($data['keyword']) && $data['keyword'] != '') {
            $where['title'] = ['like', '%'.$data['keyword'].'%'];
        }
        $list = Db::name('article_content')->field('id,cate,title,create_time,click,displayorder,is_recommend,status')->where($where)->order('displayorder desc')->paginate(10,false,['query' => $data])->each(function($item, $key){
            $item['create_time'] = date('Y-m-d H:i:s', $item['create_time']);
            $item['cate_text'] = Db::name('article_category')->where(['id' => $item['cate']])->value('title');
            return $item;
        });
        $page = $list->render();
        return view('', ['list' => $list, 'page' => $page, 'category' => $category, 'where' => $data]);
    }
    public function content_add()
    {
        if (Request::instance()->isPost()) {
            $data = input('post.');
            $thumb = '';
            if (!empty($_FILES['thumb']['name'])) {
                $file = request()->file('thumb');
                $info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                $thumb = '/uploads/'.$info->getSaveName();
            }
            $data['thumb'] = $thumb;
            $data['create_time'] = time();
            $id = Db::name('article_content')->insertGetId($data);
            plog("article/content_add","添加文章 ID " . $id);
            $this->success('添加成功',url('article/contents'));
        } else {
            $category = Db::name('article_category')->where('status=1')->field('id,title')->order('displayorder desc')->select();
            return view('', ['category' => $category]);
        }
    }
    public function content_edit()
    {
        $id = Request::instance()->param('id');
        $item = Db::name('article_content')->where(['id' => $id])->find();
        if (empty($item)) {
            $this->error('未找到相关文章');
        }
        if (Request::instance()->isAjax()) {
            $type = Request::instance()->param('type');
            $value = Request::instance()->param('value');
            Db::name('article_content')->where(['id' => $id])->update([$type => $value]);
            $remark = '';
            if ($type == 'displayorder') {
                $remark = '排序';
            } elseif ($type == 'title') {
                $remark = '标题';
            } else if ($type == 'status') {
                $remark = '状态';
            } elseif ($type == 'is_recommend') {
                $remark = '开启状态';
            }
            plog('article/content_edit', "修改文章{$remark} ID " . $id);
            $this->success();
        } elseif (Request::instance()->isPost()) {
            $data = input('post.');
            if (!empty($_FILES['thumb']['name'])) {
                $file = request()->file('thumb');
                $info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                $thumb = '/uploads/'.$info->getSaveName();
                $data['thumb'] = $thumb;
            }
            Db::name('article_content')->where(['id' => $id])->update($data);
            plog('article/content_edit', "修改文章 ID " . $id);
            $this->success('修改成功', url('article/contents'));
        } else {
            $category = Db::name('article_category')->where('status=1')->field('id,title')->order('displayorder desc')->select();
            return view('', ['item' => $item, 'category' => $category]);
        }
    }
    public function content_delete($id){
        $item = Db::name('article_content')->where('id='.$id)->find();
        if (empty($item)) {
            $this->error('文章不存在或已删除');
        }
        Db::name('article_content')->where('id='.$id)->delete();
        plog('article/content_delete', '删除文章 ID ' . $id . "标题 :" . $item['title']);
        $this->success('成功删除文章');
    }
}