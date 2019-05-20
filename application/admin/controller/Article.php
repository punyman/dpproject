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

class Article extends Admin
{
    public function category()
    {
        $list = '[{"id":1,"title":"Item 1","items":[]},{"id":2,"title":"Item 2","items":[{"id":21,"title":"Item 2.1","items":[{"id":211,"title":"Item 2.1.1","items":[]},{"id":212,"title":"Item 2.1.2","items":[]}]},{"id":22,"title":"Item 2.2","items":[{"id":221,"title":"Item 2.2.1","items":[]},{"id":222,"title":"Item 2.2.2","items":[]}]}]},{"id":3,"title":"Item 3","items":[]},{"id":4,"title":"Item 4","items":[{"id":41,"title":"Item 4.1","items":[]}]}]';
        $datas = json_decode($list,true);
        return view('', ['list' => $list, 'datas' => $datas]);
    }
    public function category_add()
    {
        $data = input('post.');
        $file = request()->file('thumb');
        $info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
        $thumb = $info->getSaveName();
        $updata = ['title' => trim($data['title']), 'displayorder' => intval($data['displayorder']), 'status' => intval($data['status']), 'thumb' => $thumb];
        Db::name('article_category')->insert($updata);
        $this->success('添加成功');
    }
}